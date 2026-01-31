package com.example.registrationdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.registrationdemo.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
