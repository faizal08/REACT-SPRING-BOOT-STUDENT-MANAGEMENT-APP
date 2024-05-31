package com.reactspringproject.backend.Controller;

import com.reactspringproject.backend.Entity.User;
import com.reactspringproject.backend.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AdminController
{
    private UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/dashboard")
    public ResponseEntity<?> dashboard(){


        return  ResponseEntity.ok("faizal");

    }
    @GetMapping("/getAll")
    public List<User> getAllUsers(){

        List<User>user=userService.getAllUsers();
        System.out.println(user.size());
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{userName}")
    public User getUser(@PathVariable("userName")String userName){
        System.out.println(userName);

        return userService.getUser(userName);
    }

    @PutMapping("/editUser")
    public User updateUser(@RequestBody Long id){
        try {
            User user=userService.editUser(id);
            return user;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }


    @PutMapping("/deleteUser")

    public void deleteUser(@RequestBody Long id){
        userService.userdelete(id);


    }
    @PutMapping("/updateEdit")
    public  void  updateEdit(@RequestBody User user1){

        userService.updateEdit(user1);
    }
    @PutMapping("/search")
    public List<User> search(@RequestBody User user){
        System.out.println("oooooooooooooooooooooooooooooooooooopsa"+user.getFirstName());
        List<User> users=userService.search(user.getFirstName());

        return users;
    }
}
