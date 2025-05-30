package hoangvacban.demo.project_newjeans.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SurveyDTO {
    private String title;
    private List<QuestionDTO> questions = new ArrayList<>();
}
