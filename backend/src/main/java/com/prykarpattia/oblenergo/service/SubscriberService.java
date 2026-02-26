package com.prykarpattia.oblenergo.service;

import com.prykarpattia.oblenergo.dto.SubscriberRequest;
import com.prykarpattia.oblenergo.entity.Subscriber;
import com.prykarpattia.oblenergo.entity.SubscriberStatus;
import com.prykarpattia.oblenergo.repository.SubscriberRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubscriberService {

    private final SubscriberRepository repository;

    public SubscriberService(SubscriberRepository repository) {
        this.repository = repository;
    }

    public List<Subscriber> getAll() {
        return repository.findAll();
    }

    public List<Subscriber> search(String query) {
        return repository.search(query);
    }

    public Subscriber add(SubscriberRequest req) {
        Subscriber s = new Subscriber();
        s.setFullName(req.getFullName());
        s.setAddress(req.getAddress());
        s.setPhone(req.getPhone());
        s.setContractNumber(req.getContractNumber());
        s.setStatus(req.getStatus());
        return repository.save(s);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Subscriber updateStatus(Long id, String status) {
        Subscriber s = repository.findById(id).orElseThrow();
        s.setStatus(SubscriberStatus.valueOf(status));
        return repository.save(s);
    }
}