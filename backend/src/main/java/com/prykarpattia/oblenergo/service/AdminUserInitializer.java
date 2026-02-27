package com.prykarpattia.oblenergo.service;

import com.prykarpattia.oblenergo.entity.AppUser;
import com.prykarpattia.oblenergo.entity.Role;
import com.prykarpattia.oblenergo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.auth.default-admin.username:admin}")
    private String defaultAdminUsername;

    @Value("${app.auth.default-admin.password:admin123}")
    private String defaultAdminPassword;

    public AdminUserInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        AppUser adminUser = userRepository.findByUsername(defaultAdminUsername)
                .orElseGet(() -> {
                    AppUser newAdmin = new AppUser();
                    newAdmin.setUsername(defaultAdminUsername);
                    return newAdmin;
                });

        boolean userNeedsUpdate = false;

        if (adminUser.getRole() != Role.ADMIN) {
            adminUser.setRole(Role.ADMIN);
            userNeedsUpdate = true;
        }

        if (adminUser.getPassword() == null || !passwordEncoder.matches(defaultAdminPassword, adminUser.getPassword())) {
            adminUser.setPassword(passwordEncoder.encode(defaultAdminPassword));
            userNeedsUpdate = true;
        }

        if (userNeedsUpdate) {
            userRepository.save(adminUser);
        }
    }
}
