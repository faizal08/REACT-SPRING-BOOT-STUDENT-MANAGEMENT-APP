package com.reactspringproject.backend.Config;

import com.reactspringproject.backend.Dao.UserRepository;
import com.reactspringproject.backend.Entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{
    private UserRepository userRepository;



    public UserDetailsServiceImpl(UserRepository userRepository) {

        this.userRepository = userRepository;
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user=this.userRepository.findByUsername(username);

        if(user == null){
            System.out.println("User not Found");
            throw new UsernameNotFoundException("No user Found");
        }

        return user;
    }
}
