package com.example.registrationdemo.service;

import com.example.registrationdemo.entity.user;
import com.example.registrationdemo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class userservice {

    private final UserRepository userRepository;

    public userservice(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public user saveUser(user user) {
        return userRepository.save(user);
    }
}
