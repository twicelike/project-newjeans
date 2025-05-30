package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.MessageDTO;
import hoangvacban.demo.project_newjeans.dto.SurveyDTO;
import hoangvacban.demo.project_newjeans.dto.request.ResetPasswordDTO;
import hoangvacban.demo.project_newjeans.dto.response.QuestionResponse;
import hoangvacban.demo.project_newjeans.dto.response.SurveyResponse;
import hoangvacban.demo.project_newjeans.entity.Post;
import hoangvacban.demo.project_newjeans.entity.Survey;
import hoangvacban.demo.project_newjeans.service.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final EmailService emailService;
    private final PostService postService;
    private final UserService userService;
    private final NjzSendService njzSendService;
    private final SurveyService surveyService;
    private final ChatMessageService messageService;

    public ApiController(
            EmailService emailService,
            PostService postService,
            UserService userService,
            NjzSendService njzSendService,
            SurveyService surveyService,
            ChatMessageService messageService
    ) {
        this.emailService = emailService;
        this.postService = postService;
        this.userService = userService;
        this.njzSendService = njzSendService;
        this.surveyService = surveyService;
        this.messageService = messageService;
    }

    @PostMapping("/add-friend/{id}")
    public ResponseEntity<String> addFriend(@PathVariable String id, HttpSession session, @RequestBody String content) {
        long userId = (long) session.getAttribute(USER_ID);

        if (njzSendService.addCrush(userId, Long.parseLong(id), content)) {
            return ResponseEntity.ok("Yes sir");
        }

        return ResponseEntity.badRequest().body("No sir");
    }

    @PostMapping("/unfriend/{id}")
    public ResponseEntity<String> unfriend(@PathVariable String id, HttpSession session) {
        long userId = (long) session.getAttribute(USER_ID);

        if (njzSendService.deleteCrush(userId, Long.parseLong(id))) {
            return ResponseEntity.ok("Yes sir");
        }

        return ResponseEntity.badRequest().body("No sir");
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<String> accept(@PathVariable String id, HttpSession session) {
        long userId = (long) session.getAttribute(USER_ID);

        if (njzSendService.acceptCrush(userId, Long.parseLong(id))) {
            return ResponseEntity.ok("Yes sir");
        }

        return ResponseEntity.badRequest().body("No sir");
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id, HttpSession session) {
        long userId = (long) session.getAttribute(USER_ID);

        if (njzSendService.deleteCrush(userId, Long.parseLong(id))) {
            return ResponseEntity.ok("Yes sir");
        }

        return ResponseEntity.badRequest().body("No sir");
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<String> reject(@PathVariable String id, HttpSession session) {
        long userId = (long) session.getAttribute(USER_ID);

        if (njzSendService.deleteCrush(userId, Long.parseLong(id))) {
            return ResponseEntity.ok("Yes sir");
        }

        return ResponseEntity.badRequest().body("No sir");
    }

    @PostMapping("/upload-survey")
    public ResponseEntity<String> addSurvey(@RequestBody SurveyDTO surveyDTO, HttpSession session) {
        long userId = (long) session.getAttribute(USER_ID);
        System.out.println(surveyDTO.getTitle());
        surveyDTO.getQuestions().forEach(System.out::println);
        surveyService.createSurvey(userId, surveyDTO.getQuestions(), surveyDTO.getTitle());
        return ResponseEntity.ok("ok");
    }


    @GetMapping("/admin/post")
    public ResponseEntity<List<Post>> getPostPage(
            @RequestParam("page") Optional<String> pageOptional
    ) {
        int page = 1;
        try {
            if (pageOptional.isPresent()) {
                page = Integer.parseInt(pageOptional.get());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        Pageable pageable = PageRequest.of(page - 1, 10);
        Page<Post> postPage = postService.getPosts(pageable);
        List<Post> posts = postPage.getContent();

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/send-otp/{email}")
    public ResponseEntity<String> sendOtp(@PathVariable String email) {
        System.out.println(email);

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        String message = emailService.sendOtpToVerifyEmail(email, "Your OTP code");
        return ResponseEntity.ok(message);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        String message = userService.resetPassword(resetPasswordDTO);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/survey/{id}")
    @ResponseBody
    public ResponseEntity<SurveyResponse> getSurvey(@PathVariable String id) {
        long userId = Long.parseLong(id);
        Survey survey = surveyService.getSurveyByUser(userId);

        List<QuestionResponse> questionDTOS = surveyService.convertQuestion(survey);

        return ResponseEntity.ok(new SurveyResponse(
                survey.getId(),
                survey.getTitle(),
                survey.getTimestamp(),
                survey.getUser().getId(),
                questionDTOS
        ));
    }


    @GetMapping("/message/{userId}/{receiverId}")
    @ResponseBody
    public ResponseEntity<List<MessageDTO>> getMessage(
            @PathVariable(name = "userId") String userId,
            @PathVariable(name = "receiverId") String receiverId,
            HttpSession session
    ) {
        long userIdLong = Long.parseLong(userId);
        long receiverIdLong = Long.parseLong(receiverId);
        long id = (long) session.getAttribute(USER_ID);
        if (userIdLong != id) {
            return ResponseEntity.badRequest().build();
        }
        List<MessageDTO> messageList = messageService.getAllMessage(userIdLong, receiverIdLong);
        if (messageList == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(messageList);
    }

    @GetMapping("/exists-survey/{userId}")
    @ResponseBody
    public ResponseEntity<Boolean> isSurveyExists(@PathVariable(name = "userId") String userId) {
        long userIdLong = Long.parseLong(userId);
        if (surveyService.isExistSurvey(userIdLong)) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.badRequest().build();
    }
}
