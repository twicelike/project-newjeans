package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.HobbyTagDTO;
import hoangvacban.demo.project_newjeans.dto.PostDTO;
import hoangvacban.demo.project_newjeans.entity.HobbyTag;
import hoangvacban.demo.project_newjeans.service.FeedbackService;
import hoangvacban.demo.project_newjeans.service.HobbyTagService;
import hoangvacban.demo.project_newjeans.service.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class AdminController {

    private final HobbyTagService hobbyTagService;
    private final PostService postService;
    private final FeedbackService feedbackService;

    public AdminController(HobbyTagService hobbyTagService, PostService postService, FeedbackService feedbackService) {
        this.hobbyTagService = hobbyTagService;
        this.postService = postService;
        this.feedbackService = feedbackService;
    }

    @GetMapping("/admin")
    public String getAdminPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/main";
    }

    @PostMapping("/admin/create-hobby-tag")
    public String createHobbyTag(@ModelAttribute("hobbytag") HobbyTagDTO hobbyTagDTO) {
        hobbyTagService.addHobby(hobbyTagDTO);
        System.out.println(hobbyTagDTO);
        return "admin/management/hobbytag";
    }

    @GetMapping("/admin/create-hobby-tag")
    public String createHobbyTagPage(Model model) {
        model.addAttribute("hobbytag", new HobbyTagDTO());
        return "admin/management/create";
    }

    @GetMapping("/admin/feedback")
    public String getFeedbackPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        model.addAttribute("feedbacks", feedbackService.getAllFeedback());
        return "admin/management/feedback";
    }

    @GetMapping("/admin/hobbytag")
    public String getHobbyTagPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        List<HobbyTag> hobbyTagList = hobbyTagService.getAll();
        model.addAttribute("list", hobbyTagList);
        return "admin/management/hobbytag";
    }

    @GetMapping("/admin/post")
    public String getPostPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        model.addAttribute("postDTO", new PostDTO());
        return "admin/management/post";
    }

    @PostMapping("/post")
    public String createPost(@ModelAttribute(name = "postDTO") PostDTO postDTO) {
        postService.addNewPost(postDTO);
        return "redirect:/admin/post";
    }

    @GetMapping("/admin/suspend")
    public String getSuspendPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/suspend";
    }

    @GetMapping("/admin/report")
    public String getReportPage(Model model, HttpSession session) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("avatar", session.getAttribute("avatar"));
        return "admin/management/report";
    }
}
