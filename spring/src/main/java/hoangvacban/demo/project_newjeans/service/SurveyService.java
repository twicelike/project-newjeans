package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.QuestionDTO;
import hoangvacban.demo.project_newjeans.dto.response.QuestionResponse;
import hoangvacban.demo.project_newjeans.entity.*;
import hoangvacban.demo.project_newjeans.exception.UserExistException;
import hoangvacban.demo.project_newjeans.repository.QuestionRepository;
import hoangvacban.demo.project_newjeans.repository.SurveyRepository;
import hoangvacban.demo.project_newjeans.repository.SurveyUserRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

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

    public Survey getSurveyByUser(long userId) {
        return surveyRepository.findByUserIdOrderByTimestampDesc(userId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("No survey found for user " + userId));
    }

    public List<QuestionResponse> convertQuestion(Survey survey) {
        return survey.getQuestions().stream()
                .map(question -> {
                    QuestionResponse questionDTO = new QuestionResponse();
                    questionDTO.setQuestion(question.getQuestion());
                    questionDTO.setAnswer(question.getAnswer());
                    questionDTO.setType(question.getQuestionType());
                    questionDTO.setOption1(question.getOption1());
                    questionDTO.setOption2(question.getOption2());
                    questionDTO.setOption3(question.getOption3());
                    questionDTO.setOption4(question.getOption4());
                    questionDTO.setOption5(question.getOption5());
                    questionDTO.setId(question.getId());
                    questionDTO.setSurveyId(question.getSurvey().getId());
                    return questionDTO;
                })
                .toList();
    }

    public Survey getSurveyByUserAndParticipant(long userId, long participantId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserExistException("User not found"));
        User participant = userRepository.findById(participantId)
                .orElseThrow(() -> new UserExistException("User not found"));

        Optional<SurveyUser> surveyUserOptional =
                surveyUserRepository.findFirstBySenderAndParticipantOrderBySentDateDesc(user, participant);

        return surveyUserOptional.map(SurveyUser::getSurvey).orElse(null);
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
            questionEntity.setQuestionType(question.getType());
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
        Survey oldSurvey = surveyRepository.findTopByUserOrderByTimestampDesc(user)
                .orElseThrow(() -> new UserExistException("Not found survey"));

        Survey newSurvey = new Survey();
        newSurvey.setUser(user);
        newSurvey.setTitle(oldSurvey.getTitle());
        newSurvey.setTimestamp(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
        newSurvey.setQuestions(oldSurvey.getQuestions());

        newSurvey = surveyRepository.save(newSurvey);

        SurveyUser su = new SurveyUser();
        SurveyKey key = new SurveyKey(newSurvey.getId(), userId, participantId);

        su.setKey(key);
        su.setSurvey(newSurvey);
        su.setSender(user);
        su.setParticipant(participant);
        su.setSentDate(LocalDateTime.now());

        surveyUserRepository.save(su);
    }

    public boolean isExistSurvey(long userIdLong) {
        Optional<User> userOptional = userRepository.findById(userIdLong);
        if (userOptional.isEmpty()) return false;

        Optional<Survey> surveyOptional = surveyRepository.findByUser(userOptional.get());
        return surveyOptional.isPresent();
    }

    // handle websocket
    // unsent
    // answer
    // update survey
}
