package com.prykarpattia.oblenergo.controller;

import com.prykarpattia.oblenergo.dto.SubscriberRequest;
import com.prykarpattia.oblenergo.entity.Subscriber;
import com.prykarpattia.oblenergo.service.SubscriberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subscribers")
@CrossOrigin(origins = "http://localhost:3000")
public class SubscriberController {

    private final SubscriberService service;

    public SubscriberController(SubscriberService service) {
        this.service = service;
    }

    @GetMapping
    public List<Subscriber> getAll() { return service.getAll(); }

    @GetMapping("/search")
    public List<Subscriber> search(@RequestParam String query) { return service.search(query); }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Subscriber add(@RequestBody SubscriberRequest request) { return service.add(request); }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public Subscriber updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}