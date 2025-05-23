package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.SurveyDTO;
import hoangvacban.demo.project_newjeans.dto.request.ResetPasswordDTO;
import hoangvacban.demo.project_newjeans.entity.Post;
import hoangvacban.demo.project_newjeans.service.EmailService;
import hoangvacban.demo.project_newjeans.service.NjzSendService;
import hoangvacban.demo.project_newjeans.service.PostService;
import hoangvacban.demo.project_newjeans.service.UserService;
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

    public ApiController(
            EmailService emailService,
            PostService postService,
            UserService userService,
            NjzSendService njzSendService
    ) {
        this.emailService = emailService;
        this.postService = postService;
        this.userService = userService;
        this.njzSendService = njzSendService;
    }

    @PostMapping("/add-friend/{id}")
    public ResponseEntity<String> addFriend(@PathVariable String id, HttpSession session) {
        long userId = (long) session.getAttribute(USER_ID);

        if (njzSendService.addCrush(userId, Long.parseLong(id))) {
            return ResponseEntity.ok("Yes sir");
        }

        return ResponseEntity.badRequest().body("Yes sir");
    }

    @PostMapping("/upload-survey")
    public ResponseEntity<String> addSurvey(@RequestBody SurveyDTO surveyDTO) {
        System.out.println(surveyDTO.getTitle());
        surveyDTO.getQuestions().forEach(System.out::println);
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


}
