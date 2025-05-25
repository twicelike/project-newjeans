package hoangvacban.demo.project_newjeans.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserNjz {
    private long id;
    private String firstName;
    private String lastName;
    private String username;
    private String avatar;
    private String content;
    private LocalDateTime sentDate;
}
