package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.MessageDTO;
import hoangvacban.demo.project_newjeans.dto.UserMessageDTO;
import hoangvacban.demo.project_newjeans.dto.request.ChatMessage;
import hoangvacban.demo.project_newjeans.entity.Message;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.MessageRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageService {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;
    private final UserService userService;

    public ChatMessageService(
            SimpMessagingTemplate messagingTemplate,
            UserService userService,
            MessageRepository messageRepository
    ) {
        this.messagingTemplate = messagingTemplate;
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public boolean saveMessage(ChatMessage chatMessage) {
        Optional<User> userOptional = userService.getUserById(chatMessage.getSenderId());
        if (userOptional.isEmpty()) {
            return false;
        }
        Optional<User> receiverOptional = userService.getUserById(chatMessage.getReceiverId());
        if (receiverOptional.isEmpty()) {
            return false;
        }

        Message message = new Message();
        message.setType(chatMessage.getType());
        message.setContent(chatMessage.getContent());
        message.setTimestamp(chatMessage.getTimestamp());
        message.setUser(userOptional.get());
        message.setReceiver(receiverOptional.get());
        messageRepository.save(message);
        return true;
    }

    public List<UserMessageDTO> getFriendList(long userId) {
        Optional<User> userOptional = userService.getUserById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return messageRepository.findAllAcceptedNjzSend(user);
        }

        return new ArrayList<>();
    }

    public void sendMessage(ChatMessage message) {
        // A B
        // A -> send message -> B
    }

    public List<MessageDTO> getAllMessage(long userId, long receiverId) {
        Optional<User> userOptional = userService.getUserById(userId);
        Optional<User> receiverOptional = userService.getUserById(receiverId);

        if (userOptional.isPresent() && receiverOptional.isPresent()) {
            List<Message> messages = messageRepository.getAllMessage(userOptional.get(), receiverOptional.get());
            return messages.stream().map(message -> {
                MessageDTO dto = new MessageDTO();
                dto.setId(message.getId());
                dto.setContent(message.getContent());
                dto.setType(message.getType());
                dto.setTimestamp(message.getTimestamp());
                dto.setSenderId(message.getUser().getId());
                return dto;
            }).toList();
        }
        return null;
    }
}
