package com.prykarpattia.oblenergo.dto;

import com.prykarpattia.oblenergo.entity.SubscriberStatus;
import jakarta.validation.constraints.NotBlank;

public class SubscriberRequest {
    @NotBlank
    private String fullName;

    @NotBlank
    private String address;

    private String phone;

    @NotBlank
    private String contractNumber;

    private SubscriberStatus status = SubscriberStatus.ACTIVE;

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
}