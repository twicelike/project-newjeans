package hoangvacban.demo.project_newjeans.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessage {
    private long senderId;
    private long receiverId;
    private String content;
    private String type;
    private long timestamp;
}
