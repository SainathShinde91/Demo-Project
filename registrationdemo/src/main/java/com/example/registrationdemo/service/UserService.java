package com.example.registrationdemo.service;

import com.example.registrationdemo.entity.User;
import com.example.registrationdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found:"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER") // simple role
                .build();
    }


   public boolean existsByEmail(String email) {
return userRepository.existsByEmail(email);
        }
    public User createUser(User user) {
        return userRepository.save(user);
   }
}
