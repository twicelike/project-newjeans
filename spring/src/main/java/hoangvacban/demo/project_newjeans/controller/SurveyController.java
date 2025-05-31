package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Controller
public class SurveyController {


    private final UserService userService;

    public SurveyController(UserService userService1) {
        this.userService = userService1;
    }

    @GetMapping("/survey")
    public String survey(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));

        return "client/survey/survey";
    }

    @GetMapping("/survey/{userId}")
    public String survey(@PathVariable String userId, Model model, HttpSession session) {
        Optional<User> user = userService.getUserById(Long.valueOf(userId));
        if (user.isPresent()) {
            model.addAttribute("username", user.get().getUsername());
            model.addAttribute("avatar", user.get().getAvatar());
        }
        model.addAttribute("userId", userId);
        return "client/survey/answer";
    }

}
