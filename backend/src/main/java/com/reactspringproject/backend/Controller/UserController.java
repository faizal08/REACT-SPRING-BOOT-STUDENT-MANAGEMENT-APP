package com.reactspringproject.backend.Controller;


import com.reactspringproject.backend.Entity.Role;
import com.reactspringproject.backend.Entity.User;
import com.reactspringproject.backend.Entity.UserRole;
import com.reactspringproject.backend.Model.JwtRequest;
import com.reactspringproject.backend.Service.RoleService;
import com.reactspringproject.backend.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@RestController
@CrossOrigin("*")
public class UserController
{
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticateController.class);

    private final RoleService roleService;

    //    public static final String DIRECTORY = System.getProperty("user.dir") + "/target/classes/static/";
    public static final String DIRECTORY;

    static {
        try {
            DIRECTORY = new ClassPathResource("static/").getFile().getAbsolutePath();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> registerNewUser(@RequestBody User user){


      User savedCustomer = null;
        ResponseEntity response = null;
        try {
            logger.info("Attempting to register new user");

            Role role = roleService.getRole();
            logger.info("Retrieved role from RoleService: {}", role);
            Set<UserRole> userRoles = new HashSet<>();
            UserRole userRole = new UserRole();
            userRole.setRole(role);
            userRole.setUser(user);
            userRoles.add(userRole);
            System.out.println("/////////////////////////////////////////////////////////////////////////");
//
            logger.info("UserRoles created and added to the set: {}", userRoles);

            savedCustomer = userService.createUser(user, userRoles);
            logger.info("User created successfully: {}", savedCustomer);
            if (savedCustomer.getId() > 0) {
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("{\"message\": \"Given user details are successfully registered\"}");
                logger.info("User registration response: {}", response);
            }
        }catch (Exception e){
            logger.warn("An error occurred while registering user", e);
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\": \"UserName already present, please try with another\"}");
            logger.warn("Internal server error response: {}", response);
        }


        return response;

    }

    @GetMapping("/{userName}")
    public User getUser(@PathVariable("userName") String userName){


        return userService.getUser(userName);


    }

    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){

        return userService.getUser(principal.getName());
    }


    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile multipartFile, Principal principal)throws IOException {
        System.out.println(DIRECTORY);
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
        copy(multipartFile.getInputStream(), fileStorage, REPLACE_EXISTING);

        User user=userService.getUser(principal.getName());
        userService.updateImage(user,filename);


        return ResponseEntity.ok().body(filename);
    }

    @GetMapping("download/{filename}")
    public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
        if(!Files.exists(filePath)) {
            throw new FileNotFoundException(filename + " was not found on the server");
        }
        Resource resource = new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", filename);
        httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(httpHeaders).body(resource);
    }
//    @PutMapping("/addimg")
//    public ResponseEntity<?> addImage(@RequestBody MultipartFile image){
//        System.out.println("the call get on addimg controller" + image);
//
//        return  ResponseEntity.ok("amal");
//    }


    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user,Principal principal){
        String UserName=principal.getName();

        return userService.updateUser(user,UserName);
    }
}
