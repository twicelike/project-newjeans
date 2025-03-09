package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
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
    public String getIntroducePage(Authentication authentication, HttpServletRequest request) {
        return "client/introduce_page";
    }

    @GetMapping("/home")
    public String home(Model model, HttpServletRequest request, Authentication authentication) {

        return "client/home/home";
    }

}
