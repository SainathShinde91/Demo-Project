package com.example.registrationdemo.repository;

import com.example.registrationdemo.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<user, Long> {
    boolean existsByEmail(String email);
    Optional<user> findByEmailAndPassword(String email, String password);
}
