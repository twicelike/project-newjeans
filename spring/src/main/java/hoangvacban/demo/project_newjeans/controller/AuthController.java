package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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
            BindingResult bindingResult,
            @RequestParam("images") MultipartFile[] images,
            OAuth2AuthenticationToken token
    ) {

        for (MultipartFile image : images) {
            System.out.println(image.getSize() + " : CAC");
        }
//        userService.signUpUser(user, token.getPrincipal());
        return "redirect:/home";
    }
}
