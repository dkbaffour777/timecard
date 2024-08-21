package com.dkbaffour.backend.controller;

import com.dkbaffour.backend.model.User;
import com.dkbaffour.backend.service.UserService;
import com.dkbaffour.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public User signUpUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.saveUser(user);
    }

    @PostMapping("/signin")
    public String signInUser(@RequestBody User user) {
        User existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Retrieve the role of the user
            String role = existingUser.getRole().getName();

            // Create a list of granted authorities based on the user's role
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

            // Generate the token with the user's authorities
            return jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(existingUser.getEmail(), existingUser.getPassword(), authorities));
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }

}
