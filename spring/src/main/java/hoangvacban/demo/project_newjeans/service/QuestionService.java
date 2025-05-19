package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(
            QuestionRepository questionRepository
    ) {
        this.questionRepository = questionRepository;
    }


}
