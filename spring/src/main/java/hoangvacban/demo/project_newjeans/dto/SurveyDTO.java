package hoangvacban.demo.project_newjeans.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class SurveyDTO {
    private String title;
    private List<QuestionDTO> questions = new ArrayList<>();
}
