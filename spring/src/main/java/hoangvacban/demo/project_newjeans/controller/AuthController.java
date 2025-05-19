package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.EmailService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Slf4j
@Controller
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;

    public AuthController(
            UserService userService,
            EmailService emailService
    ) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @GetMapping("/login")
    public String login() {
        return "client/auth/login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new UserDTO());
        return "client/auth/register";
    }

    @PostMapping("/test-send-mail")
    public String testSendMail() {
        emailService.sendOtpToVerifyEmail("mhoanga1@gmail.com", "hehe");
        return "redirect:/";
    }

    @GetMapping("/test-send-mail")
    public String testSendMail2() {
        return "client/introduce_page";
    }


    @PostMapping("/register")
    public String register(
            @Valid @ModelAttribute("user") UserDTO user,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            for (String error : errors) {
                log.atError().log(error);
            }
            return "client/auth/register";
        }

        boolean valid = userService.signUpUser(user);

        if (!valid) return "client/auth/register";

        return "redirect:/set-up-profile";
    }

}
