package hoangvacban.demo.project_newjeans.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserMessageDTO {
    private long userId;
    private String username;
    private String avatar;
    private String phaseUrl;
}
