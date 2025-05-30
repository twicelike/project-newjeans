package hoangvacban.demo.project_newjeans.dto.response;

import hoangvacban.demo.project_newjeans.entity.Survey;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionResponse {
    private long id;
    private String type;
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String option5;
    private String answer;
    private long surveyId;
}
