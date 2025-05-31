package hoangvacban.demo.project_newjeans.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private String content;
    private LocalDateTime createdAt;
    private String author;
    private String title;
}
