package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.dto.request.ChangePasswordDTO;
import hoangvacban.demo.project_newjeans.dto.request.ResetPasswordDTO;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.EmailService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpSession;
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

import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;

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

    @PostMapping("/register")
    public String register(
            @Valid @ModelAttribute("user") UserDTO user,
            BindingResult result,
            HttpSession session,
            Model model
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

        String emailError = emailService.verifyEmail(user.getEmail(), user.getOtp());
        if (emailError.contains("!")) {
            model.addAttribute("error", emailError);
            return "client/auth/register";
        }

        User valid = userService.signUpUser(user);
        if (valid == null) {
            model.addAttribute("error", "Not good, try again!");
            return "client/auth/register";
        }

        session.setAttribute(USER_ID, valid.getId());

        return "redirect:/set-up-profile";
    }

    @PostMapping("/reset-password")
    public String resetPassword(
            @ModelAttribute("password") ResetPasswordDTO passwordDTO,
            Model model
    ) {
        String message = userService.resetPassword(passwordDTO);

        if (message.contains("!")) {
            model.addAttribute("error", message);
            return "client/auth/restore_fail";
        }

        return "redirect:/reset-password-success";
    }

    @GetMapping("/reset-password")
    public String resetPassword(Model model) {
        model.addAttribute("password", new ResetPasswordDTO());
        return "client/auth/reset_password";
    }

    @GetMapping("/reset-password-fail")
    public String resetPasswordFailed(Model model) {
        return "client/auth/restore_fail";
    }

    @GetMapping("/reset-password-success")
    public String resetPasswordSuccess(Model model) {
        return "client/auth/restore_success";
    }

    @PostMapping("/change-password")
    public String changePassword(
            @Valid @ModelAttribute("passwordDTO") ChangePasswordDTO passwordDTO,
            BindingResult result,
            Model model,
            HttpSession session
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            for (String error : errors) {
                log.atError().log(error);
            }
            model.addAttribute("error", true);
            return "client/profile/profile";
        }

        long id = (long) session.getAttribute(USER_ID);
        boolean isValidToChangePassword = userService.changePassword(id, passwordDTO);
        model.addAttribute("error", !isValidToChangePassword);

        return "client/profile/profile";
    }

}
