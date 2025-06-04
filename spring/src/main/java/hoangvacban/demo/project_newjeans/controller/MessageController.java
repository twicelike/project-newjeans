package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.request.ChatMessage;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.ChatMessageService;
import hoangvacban.demo.project_newjeans.service.NjzSendService;
import hoangvacban.demo.project_newjeans.service.UserService;
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
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;

@Controller
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService userService;
    private final NjzSendService njzSendService;
    private final ChatMessageService messageService;

    public MessageController(
            SimpMessagingTemplate simpMessagingTemplate,
            UserService userService,
            NjzSendService njzSendService,
            ChatMessageService messageService
    ) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userService = userService;
        this.njzSendService = njzSendService;
        this.messageService = messageService;
    }

    @GetMapping("/message")
    public String chat(Model model, HttpSession session) {
        long userId = Long.parseLong(session.getAttribute(USER_ID).toString());

        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            model.addAttribute("user", user);
        }

        model.addAttribute("users", messageService.getFriendList(userId));

        return "client/message/message";
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
        System.out.println(message);
        if (messageService.saveMessage(message)) {
            simpMessagingTemplate.convertAndSend("/topic/chat.privateMessage/" + userId, message);
        }
    }

}
