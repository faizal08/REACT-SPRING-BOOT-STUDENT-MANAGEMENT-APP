package com.reactspringproject.backend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.reactspringproject.backend.Config.JwtUtils;
import com.reactspringproject.backend.Config.UserDetailsServiceImpl;
import com.reactspringproject.backend.Entity.User;
import com.reactspringproject.backend.Model.JwtRequest;
import com.reactspringproject.backend.Model.JwtResponse;
import com.reactspringproject.backend.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class AuthenticateController
{

    private static final Logger logger = LoggerFactory.getLogger(AuthenticateController.class);

    private AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;

    private UserService userService;

    private UserDetailsServiceImpl userDetailsServiceImpl;

    public AuthenticateController(AuthenticationManager authenticationManager, JwtUtils jwtUtils,
                                  UserDetailsServiceImpl userDetailsServiceImpl,UserService userService) {
        this.userService=userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }


    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            logger.info("Call get on JWT filter at login time with url= generate-request");
            User user = userService.getUser(jwtRequest.getUsername());
            logger.info("User retrieved from database: {}", user);

            if (user.isDeleted()) {
                logger.warn("User is deleted: {}", jwtRequest.getUsername());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }

            this.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
            logger.info("User authenticated successfully: {}", jwtRequest.getUsername());

            UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
            logger.info("UserDetails loaded: {}", userDetails);

            String token = this.jwtUtils.generateToken(userDetails);
            logger.info("JWT token generated: {}", token);

            JwtResponse jwtResponse = new JwtResponse(token, user);
            logger.info("Response with new JWT token is ready to be sent");

            return ResponseEntity.ok(jwtResponse);

        } catch (UsernameNotFoundException e) {
            logger.error("User not found: {}", jwtRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User Not Found");
        } catch (DisabledException e) {
            logger.error("User is disabled: {}", jwtRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Disabled");
        } catch (BadCredentialsException e) {
            logger.error("Invalid credentials for user: {}", jwtRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        } catch (Exception e) {
            logger.error("Internal server error while generating token for user: {}", jwtRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    private void authenticate(String userName, String password) throws Exception {
        try {
            logger.debug("Authenticating user: {}", userName);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
            logger.info("User {} authenticated successfully", userName);
        } catch (DisabledException e) {
            logger.error("User {} is disabled", userName, e);
            throw e; // Rethrow or handle it accordingly
        } catch (BadCredentialsException e) {
            logger.error("Invalid credentials for user {}", userName, e);
            throw e; // Rethrow or handle it accordingly
        } catch (Exception e) {
            logger.error("Authentication failed for user {}", userName, e);
            throw e; // Rethrow or handle it accordingly
        }
    }





    @GetMapping("/logout")
    public void logout(){
        SecurityContextHolder.clearContext();

    }
}
