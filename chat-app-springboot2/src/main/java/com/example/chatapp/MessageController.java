package com.example.chatapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/sendMessage")
    public String sendMessage(@RequestBody Message message) {
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
        return "Message sent successfully";
    }

    @GetMapping("/getMessages")
    public List<Message> getMessages(
            @RequestParam("user_id") Long userId,
            @RequestParam("receiver_id") Long receiverId
    ) {
        // Fetch messages for the specific conversation
        return messageRepository.findConversation(userId, receiverId);
    }
}