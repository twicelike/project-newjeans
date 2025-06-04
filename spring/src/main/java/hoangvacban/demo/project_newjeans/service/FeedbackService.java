package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.FeedbackDTO;
import hoangvacban.demo.project_newjeans.entity.FeedBack;
import hoangvacban.demo.project_newjeans.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public void saveFeedback(FeedbackDTO feedbackDTO) {
        FeedBack feedBack = new FeedBack();
        feedBack.setEmail(feedbackDTO.getEmail());
        feedBack.setContent(feedbackDTO.getContent());
        feedBack.setDate(LocalDateTime.now());
        feedbackRepository.save(feedBack);
    }

    public List<FeedBack> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
