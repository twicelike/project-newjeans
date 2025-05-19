package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.QuestionDTO;
import hoangvacban.demo.project_newjeans.entity.Question;
import hoangvacban.demo.project_newjeans.entity.Survey;
import hoangvacban.demo.project_newjeans.entity.SurveyUser;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.exception.UserExistException;
import hoangvacban.demo.project_newjeans.repository.QuestionRepository;
import hoangvacban.demo.project_newjeans.repository.SurveyRepository;
import hoangvacban.demo.project_newjeans.repository.SurveyUserRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final ModelMapper modelMapper;
    private final SurveyUserRepository surveyUserRepository;

    public SurveyService(
            SurveyRepository surveyRepository,
            UserRepository userRepository,
            QuestionRepository questionRepository,
            ModelMapper modelMapper,
            SurveyUserRepository surveyUserRepository
    ) {
        this.surveyRepository = surveyRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.modelMapper = modelMapper;
        this.surveyUserRepository = surveyUserRepository;
    }

    @Transactional
    public void createSurvey(long userId, List<QuestionDTO> questions, String title) {
        if (questions == null || questions.isEmpty()) {
            throw new IllegalArgumentException("Survey must contain at least one question");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new UserExistException("User not found"));
        Survey survey = new Survey();
        survey.setUser(user); // set owner
        survey.setTitle(title);
        survey.setTimestamp(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));

        surveyRepository.save(survey);

        for (QuestionDTO question : questions) {
            Question questionEntity = modelMapper.map(question, Question.class);
            questionEntity.setSurvey(survey);
            questionRepository.save(questionEntity);
        }
    }

    @Transactional
    public void sendSurvey(long userId, long participantId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserExistException("User not found"));
        User participant = userRepository.findById(participantId)
                .orElseThrow(() -> new UserExistException("User not found"));
        Survey survey = surveyRepository.findTopByUserOrderByTimestampDesc(user)
                .orElseThrow(() -> new UserExistException("Not found survey"));

        SurveyUser su = new SurveyUser();
        su.setSurvey(survey);
        su.setSender(user);
        su.setParticipant(participant);
        su.setAnswered(false);

        surveyUserRepository.save(su);
    }

    // handle websocket
    // unsent
    // answer
    // update survey
}
