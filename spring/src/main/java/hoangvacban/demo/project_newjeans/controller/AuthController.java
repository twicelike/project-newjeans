package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-admin")
    public void createAdmin() {
        userService.createAdmin();
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "client/login";
    }

    @PostMapping("/register")
    public String register(
            @Valid @ModelAttribute("user") UserDTO user,
            BindingResult result
//            @RequestParam("image1") MultipartFile image1,
//            @RequestParam("image2") MultipartFile image2,
//            @RequestParam("image3") MultipartFile image3,
//            @RequestParam("image4") MultipartFile image4,
//            @RequestParam("image5") MultipartFile image5,
//            @RequestParam("image6") MultipartFile image6,
//            OAuth2AuthenticationToken token
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            errors.forEach(error -> System.out.println("LOGGER ERROR: " + error));
            return "client/set_up_profile";
        }
//        userService.signUpUser(user, token.getPrincipal());
        return "redirect:/home";
    }
}
