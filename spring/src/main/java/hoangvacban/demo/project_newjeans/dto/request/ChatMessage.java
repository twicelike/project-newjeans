package hoangvacban.demo.project_newjeans.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private String sender;
    private String content;
}
