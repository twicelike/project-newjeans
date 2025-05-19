package hoangvacban.demo.project_newjeans.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SurveyController {


    @GetMapping("/survey")
    public String survey(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));

        return "client/survey/survey";
    }


}
