package com.reactspringproject.backend.Model;

import com.reactspringproject.backend.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtResponse
{
    private String token;
    private User user;

    public JwtResponse(String token) {
        this.token = token;
    }
}
