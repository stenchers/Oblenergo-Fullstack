package com.prykarpattia.oblenergo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscribers")
public class Subscriber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, length = 500)
    private String address;

    private String phone;

    @Column(nullable = false, unique = true)
    private String contractNumber;

    @Enumerated(EnumType.STRING)
    private SubscriberStatus status = SubscriberStatus.ACTIVE;

    private LocalDateTime registrationDate = LocalDateTime.now();

    public Subscriber() {}
    public Subscriber(Long id, String fullName, String address, String phone, 
                      String contractNumber, SubscriberStatus status, LocalDateTime registrationDate) {
        this.id = id;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.contractNumber = contractNumber;
        this.status = status;
        this.registrationDate = registrationDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getContractNumber() { return contractNumber; }
    public void setContractNumber(String contractNumber) { this.contractNumber = contractNumber; }

    public SubscriberStatus getStatus() { return status; }
    public void setStatus(SubscriberStatus status) { this.status = status; }

    public LocalDateTime getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDateTime registrationDate) { this.registrationDate = registrationDate; }
}