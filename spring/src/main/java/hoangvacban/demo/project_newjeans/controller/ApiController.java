package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.SurveyDTO;
import hoangvacban.demo.project_newjeans.entity.Post;
import hoangvacban.demo.project_newjeans.service.EmailService;
import hoangvacban.demo.project_newjeans.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final EmailService emailService;
    private final PostService postService;

    public ApiController(EmailService emailService, PostService postService) {
        this.emailService = emailService;
        this.postService = postService;
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

}
