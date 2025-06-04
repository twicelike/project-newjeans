package hoangvacban.demo.project_newjeans.dto.response;

import hoangvacban.demo.project_newjeans.entity.Question;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SurveyResponse {
    private long id;
    private String title;
    private long timestamp;
    private long userId;
    private List<QuestionResponse> questions;
}
