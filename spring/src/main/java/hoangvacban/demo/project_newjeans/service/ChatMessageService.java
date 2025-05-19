package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.request.ChatMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageService {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatMessageService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendMessage(ChatMessage message) {
        // A B
        // A -> send message -> B

    }
}
