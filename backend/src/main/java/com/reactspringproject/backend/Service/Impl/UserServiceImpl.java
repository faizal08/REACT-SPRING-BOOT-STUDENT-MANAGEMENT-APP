package com.reactspringproject.backend.Service.Impl;
import com.reactspringproject.backend.Controller.UserController;
import com.reactspringproject.backend.Entity.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.reactspringproject.backend.Dao.RoleRepository;
import com.reactspringproject.backend.Dao.UserRepository;
import com.reactspringproject.backend.Entity.User;
import com.reactspringproject.backend.Entity.UserRole;
import com.reactspringproject.backend.Service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserServiceImpl implements UserService
{
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder=bCryptPasswordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user, Set<UserRole> userRoles) {
        logger.debug("Attempting to register user: {}", user.getUsername());

        User local = userRepository.findByUsername(user.getUsername());
        logger.debug("User found: {}", local);

        if (local != null) {
            logger.warn("User is already present in the database: {}", user.getUsername());
            throw new DataIntegrityViolationException("User is already present in database");
        } else {
            logger.debug("User not found, proceeding with creation.");

            for (UserRole userRole : userRoles) {
                Role role = userRole.getRole();
                if (role == null) {
                    logger.warn("UserRole {} contains a null Role object. Skipping this UserRole.", userRole);
                    continue; // Skip saving this UserRole
                }
                logger.debug("Saving role: {}", role);
                roleRepository.save(role);
            }

//            for (UserRole userRole : userRoles) {
//                logger.debug("Saving role: {}", userRole.getRole());
//                roleRepository.save(userRole.getRole());
//            }

            logger.debug("Roles saved, updating user with roles and encoding password.");
            user.getUserRoles().addAll(userRoles);
            user.setImage("default.png");
            user.setEnabled(true);
            user.setDeleted(false);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            local = userRepository.save(user);
            logger.info("New account created for user: {}", user.getUsername());
        }

        return local;
    }

    @Override
    public User getUser(String userName) {
        System.out.println(userName);
        User user= userRepository.findByUsername(userName);
        System.out.println(user);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAllBy();
    }

    @Override
    public User getUser(long id) {
        return userRepository.getUserById(id);
    }

    @Override
    public User updateUser(User user,String UserName) {

        User user1=userRepository.findByUsername(UserName);
        user1.setFirstName(user.getFirstName());
        user1.setLastName(user.getLastName());
        user1.setEmail(user.getEmail());
        user1.setPhoneNumber(user.getPhoneNumber());
        user1.setImage(user.getImage());
        userRepository.save(user1);
        return user1;
    }

    @Override
    public void deleteUser(String userName) {


        User user=userRepository.findByUsername(userName);
        System.out.println("get all request on controller class ................................."+user);

//        user.setDeleted(true);
//        userRepository.save(user);
    }

    @Override
    public void updateImage(User user, String fileName) {
        User user1=userRepository.findByUsername(user.getUsername());
        user1.setImage(fileName);
        userRepository.save(user1);

    }

    @Override
    public void userdelete(Long id) {
        User user=  userRepository.findbyid(id);
        user.setDeleted(true);
        userRepository.save(user);
    }

    @Override
    public User editUser(Long id) {
        User user=userRepository.findbyid(id);

        return user;
    }

    @Override
    public void updateEdit(User user1) {
        User user= userRepository.findbyid(user1.getId());
        user1.setPassword(user.getPassword());
        user1.setUsername(user.getUsername());
        user1.setDeleted(false);
        user1.setEnabled(true);

        userRepository.save(user1);
    }

    @Override
    public List<User> search(String name) {
        List<User> user1=  userRepository.findByFirstNameStartingWithAndDeletedIsFalse(name);




        return user1;
    }

}
