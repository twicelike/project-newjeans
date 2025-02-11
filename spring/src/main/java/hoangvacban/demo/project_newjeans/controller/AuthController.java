package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login() {
        return "login";
    }


    @PostMapping("/register")
    public String register(
            @Valid @ModelAttribute("user") UserDTO user,
            BindingResult result,
            @RequestParam("image1") MultipartFile image1,
            @RequestParam("image2") MultipartFile image2,
            @RequestParam("image3") MultipartFile image3,
            @RequestParam("image4") MultipartFile image4,
            @RequestParam("image5") MultipartFile image5,
            @RequestParam("image6") MultipartFile image6,
            OAuth2AuthenticationToken token
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            errors.forEach(error -> System.out.println("LOGGER ERROR: " + error));
            return "client/set_up_profile";
        }
        MultipartFile[] images = new MultipartFile[]{image1, image2, image3, image4, image5, image6};
        userService.signUpUser(user, token.getPrincipal(), images);
        return "redirect:/home";
    }
}
