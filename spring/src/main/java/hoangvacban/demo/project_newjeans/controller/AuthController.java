package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.ProfileDTO;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.EmailService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private EmailService emailService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-admin")
    public String createAdmin() {
        userService.createAdmin();
        return "redirect:/admin";
    }

    @PostMapping("/create-user")
    public String createUser() {
        userService.createUserMulti();
        return "redirect:/admin";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "client/auth/login";
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

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new UserDTO());
        return "client/auth/register";
    }

    @PostMapping("/register")
    public String register(
            @Valid @ModelAttribute("user") UserDTO user,
            BindingResult result,
            HttpServletRequest request
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            for (String error : errors) {
                log.atError().log(error);
            }
        }

        return "redirect:/set-up-profile";
    }


    @GetMapping("/set-up-profile")
    public String setUpProfile(Model model) {
        model.addAttribute("profile", new ProfileDTO());
        return "client/auth/set_up_profile";
    }

    @PostMapping("/save-profile")
    public String saveProfile(
            @Valid @ModelAttribute("profile") ProfileDTO profileDTO,
            BindingResult result
//            @RequestParam("image1") MultipartFile image1,
//            @RequestParam("image2") MultipartFile image2,
//            @RequestParam("image3") MultipartFile image3,
//            @RequestParam("image4") MultipartFile image4,
//            @RequestParam("image5") MultipartFile image5,
//            @RequestParam("image6") MultipartFile image6,
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            for (String error : errors) {
                log.atError().log(error);
            }
        }
        return "redirect:/home";
    }
}
