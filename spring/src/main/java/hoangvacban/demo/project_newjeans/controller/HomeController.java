package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.UserService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final UserService userService;

    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Hanni");

        return "client/introduce_page";
    }

    @GetMapping("/home")
    public String home(OAuth2AuthenticationToken token) {
        return "client/home";
    }

    @GetMapping("/set-up-profile")
    public String setUpProfile(OAuth2AuthenticationToken token, Model model) {
        if (userService.isEmailExist(token.getPrincipal().getAttribute("email"))) {
            return "redirect:/home";
        }
        model.addAttribute("user", new UserDTO());
        return "client/set_up_profile";
    }
}
