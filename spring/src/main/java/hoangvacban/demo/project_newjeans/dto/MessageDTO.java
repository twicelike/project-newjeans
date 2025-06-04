package hoangvacban.demo.project_newjeans.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {
    private long id;
    private String content;
    private String type;
    private long timestamp;
    private long senderId;
}
