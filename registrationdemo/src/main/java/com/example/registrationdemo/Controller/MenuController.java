package com.example.registrationdemo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.registrationdemo.entity.Menu;
import com.example.registrationdemo.repository.MenuRepository;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    // Get all menu items
    @GetMapping
    public List<Menu> getMenu() {
        return menuRepository.findAll();
    }

    //  Add new menu item
    @PostMapping
    public Menu addMenu(@RequestBody Menu menu) {
        // Optional: validate menu fields if needed
        return menuRepository.save(menu);
    }
}
