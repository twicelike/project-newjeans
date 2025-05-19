package hoangvacban.demo.project_newjeans.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {


    @GetMapping("/admin")
    public String getAdminPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/main";
    }

    @GetMapping("/admin/feedback")
    public String getFeedbackPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/feedback";
    }

    @GetMapping("/admin/hobbytag")
    public String getHobbyTagPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/hobbytag";
    }

    @GetMapping("/admin/post")
    public String getPostPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/post";
    }

    @GetMapping("/admin/suspend")
    public String getSuspendPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/suspend";
    }

}
