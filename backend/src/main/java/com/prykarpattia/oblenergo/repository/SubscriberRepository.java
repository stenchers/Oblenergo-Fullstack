package com.prykarpattia.oblenergo.repository;

import com.prykarpattia.oblenergo.entity.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    @Query("SELECT s FROM Subscriber s WHERE LOWER(s.fullName) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(s.address) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR s.contractNumber LIKE CONCAT('%', :q, '%')")
    List<Subscriber> search(@Param("q") String query);
}