package com.dkbaffour.backend.service;

import com.dkbaffour.backend.dto.EntityToDTOMapper;
import com.dkbaffour.backend.dto.UserDTO;
import com.dkbaffour.backend.model.Role;
import com.dkbaffour.backend.model.User;
import com.dkbaffour.backend.repository.RoleRepository;
import com.dkbaffour.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EntityToDTOMapper entityToDTOMapper;

    // Save a user and return UserDTO
    public User saveUser(User user) {
        if (user.getRole() == null || user.getRole().getName() == null) {
            throw new IllegalArgumentException("Role is required");
        }

        String roleName = user.getRole().getName();

        // Check if the user's role matches one of the predefined roles
        if (!(Role.ADMIN.equals(roleName) || Role.USER.equals(roleName))) {
            throw new IllegalArgumentException("Invalid role provided");
        }

        // Fetch the role from the database
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found in the database"));

        // Set the role in the user entity
        user.setRole(role);

        // Save the user entity
        return userRepository.save(user);
    }

    // Get all users and return as UserDTO list
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(entityToDTOMapper::convertToUserDTO)
                .collect(Collectors.toList());
    }

    // Get user by ID and return as UserDTO
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return entityToDTOMapper.convertToUserDTO(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
