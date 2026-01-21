package com.example.registrationdemo.controller;

// replace old imports with these
import com.example.registrationdemo.dto.userRegisterRequest;
import com.example.registrationdemo.entity.user;
import com.example.registrationdemo.repository.UserRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class usercontroller {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody userRegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(error);
        }

        user user = new user();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setGender(request.getGender());

        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Registration successful");
        response.put("username", user.getUsername());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody user loginData) {
        return userRepository.findByEmailAndPassword(loginData.getEmail(), loginData.getPassword())
                .map(u -> {
                    Map<String, String> res = new HashMap<>();
                    res.put("message", "Login successful");
                    res.put("username", u.getUsername());
                    return ResponseEntity.ok(res);
                })
                .orElseGet(() -> {
                    Map<String, String> err = new HashMap<>();
                    err.put("message", "Invalid email or password");
                    return ResponseEntity.badRequest().body(err);
                });
    }
}
