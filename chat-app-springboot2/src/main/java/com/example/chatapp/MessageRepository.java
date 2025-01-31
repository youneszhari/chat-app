package com.example.chatapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.senderId = :userId AND m.receiverId = :receiverId) OR (m.senderId = :receiverId AND m.receiverId = :userId)")
    List<Message> findConversation(@Param("userId") Long userId, @Param("receiverId") Long receiverId);
}