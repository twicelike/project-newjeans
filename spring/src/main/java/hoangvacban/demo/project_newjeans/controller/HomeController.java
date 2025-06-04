package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.FeedbackDTO;
import hoangvacban.demo.project_newjeans.dto.UserNjz;
import hoangvacban.demo.project_newjeans.entity.HobbyTag;
import hoangvacban.demo.project_newjeans.entity.Post;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;

@Controller
public class HomeController {

    private final UserService userService;
    private final HobbyTagService hobbyTagService;
    private final NjzSendService njzSendService;
    private final FeedbackService feedbackService;
    private final PostService postService;

    public HomeController(
            UserService userService,
            HobbyTagService hobbyTagService,
            NjzSendService njzSendService,
            FeedbackService feedbackService,
            PostService postService
    ) {
        this.userService = userService;
        this.hobbyTagService = hobbyTagService;
        this.njzSendService = njzSendService;
        this.feedbackService = feedbackService;
        this.postService = postService;
    }

    @PostMapping("/search")
    public String search(@RequestParam String query, RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("query", query);
        return "redirect:/search?query=" + query;
    }

    @GetMapping("/search")
    public String search(@RequestParam(required = false) String query, Model model, HttpSession session) {
        long id = (long) session.getAttribute(USER_ID);

        Optional<User> userOptional = userService.getUserById(id);
        userOptional.ifPresent(user -> model.addAttribute("user", user));

        model.addAttribute("users", userService.getSearchList(query));

        System.out.println("Query: " + query);
        model.addAttribute("query", query);
        List<HobbyTag> hobbyTagList = hobbyTagService.getAll();
        model.addAttribute("tags", hobbyTagList);
        return "client/search/search";
    }

    @GetMapping("/notification")
    public String notification(Model model, HttpSession session) {
        long id = (long) session.getAttribute(USER_ID);

        Optional<User> userOptional = userService.getUserById(id);
        userOptional.ifPresent(user -> model.addAttribute("user", user));

        return "client/home/notification";
    }

    @GetMapping("/")
    public String getIntroducePage(Model model) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Post> postPage = postService.getPosts(pageable);
        List<Post> posts = postPage.getContent();
        model.addAttribute("posts", posts);
        return "client/introduce_page";
    }

    @GetMapping("/feedback")
    public String getFeedbackPage(Model model) {
        model.addAttribute("feedbackDTO", new FeedbackDTO());
        return "client/feedback";
    }

    @PostMapping("/feedback")
    public String sendFeedback(@ModelAttribute(name = "feedbackDTO") FeedbackDTO feedbackDTO) {
        feedbackService.saveFeedback(feedbackDTO);
        return "redirect:/";
    }


    @GetMapping("/main")
    public String getHomePage(Model model, HttpSession session) {
        long id = (long) session.getAttribute(USER_ID);

        Optional<User> userOptional = userService.getUserById(id);

        userOptional.ifPresent(user -> {
            model.addAttribute("user", user);
        });

        List<User> users = userService.getUserList(id);
        model.addAttribute("users", users);
        return "client/home/home";
    }

    @GetMapping("/njz-request")
    public String getNjzRequest(Model model, HttpSession session) {
        long id = (long) session.getAttribute(USER_ID);

        Optional<User> userOptional = userService.getUserById(id);
        List<UserNjz> send = njzSendService.getNjzSend(id);
        List<UserNjz> come = njzSendService.getNjzCome(id);

        userOptional.ifPresent(user -> {
            model.addAttribute("user", user);
        });

        model.addAttribute("send", send);
        model.addAttribute("come", come);
        return "client/home/njz_request";
    }

    @GetMapping("/community-guidelines")
    public String getCommunityGuidelinesPage() {
        return "client/community-guidelines";
    }

    @GetMapping("/safety-tips")
    public String getSafetyTipsPage() {
        return "client/safety-tips";
    }

    @GetMapping("/safety-policy")
    public String getSafetyPolicyPage() {
        return "client/safety-policy";
    }

    @GetMapping("/safety-reporting")
    public String getSafetyReportingPage() {
        return "client/safety-reporting";
    }

    @GetMapping("/security")
    public String getSecurityPage() {
        return "client/security";
    }

    @GetMapping("/createadmin")
    public String getCreateAdminPage() {
        return "client/createadmin";
    }

    @PostMapping("/createadmin")
    public String createAdmin() {
        userService.createAdmin();
        return "redirect:/";
    }

}
