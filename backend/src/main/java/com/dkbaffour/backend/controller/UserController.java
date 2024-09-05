package com.dkbaffour.backend.controller;

import com.dkbaffour.backend.model.User;
import com.dkbaffour.backend.service.UserService;
import com.dkbaffour.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> signUpUser(@RequestBody User user) {
        // Encode the user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Save the user
        User savedUser = userService.saveUser(user);

        // Generate a JWT token for the new user
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                savedUser.getEmail(),
                savedUser.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + savedUser.getRole().getName()))
        ));

        // Return the JWT token
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Registration successful");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signInUser(@RequestBody User user) {
        User existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Retrieve the role of the user
            String role = existingUser.getRole().getName();

            // Create a list of granted authorities based on the user's role
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

            // Generate the token with the user's authorities
            String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(existingUser.getEmail(), existingUser.getPassword(), authorities));

            // Return the token in the response
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("fullName", existingUser.getFirstName() + " " + existingUser.getLastName());
            response.put("email", existingUser.getEmail());

            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}
