package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.request.ChatMessage;
import jakarta.servlet.http.HttpSession;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;

@Controller
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping("/chat")
    public String chat(Model model, HttpSession session) {
        model.addAttribute(USER_ID, session.getAttribute(USER_ID));
        return "client/chat/chat";
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage message) {
        return message;
    }

    @MessageMapping("/chat.privateMessage/{userId}")
    public void privateMessage(@Payload ChatMessage message,
                               @DestinationVariable("userId") String userId,
                               Principal principal) {
//        message.setSender(principal.getName());
        simpMessagingTemplate.convertAndSend("/topic/chat.privateMessage/" + userId, message);
    }

}
