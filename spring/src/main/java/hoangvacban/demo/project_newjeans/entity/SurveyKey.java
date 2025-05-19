package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SurveyKey implements Serializable {
    @Column(name = "survey_id")
    private long surveyId;

    @Column(name = "sender_id")
    private long senderId;

    @Column(name = "participant_id")
    private long participantId;
}
