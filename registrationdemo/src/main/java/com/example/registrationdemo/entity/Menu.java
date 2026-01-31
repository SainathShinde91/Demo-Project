package com.example.registrationdemo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate dob;
    private String city;
    private String state;
    private String country;
    private String pincode;

    // Add this to connect Menu → User
    @ManyToOne
    @JoinColumn(name = "user_id") // foreign key column in menu table
    private User user;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
