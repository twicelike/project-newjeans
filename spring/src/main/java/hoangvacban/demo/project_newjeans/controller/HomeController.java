package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.service.HobbyTagService;
import hoangvacban.demo.project_newjeans.service.NjzSendService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    private final UserService userService;
    private final HobbyTagService hobbyTagService;
    private final NjzSendService njzSendService;

    public HomeController(
            UserService userService,
            HobbyTagService hobbyTagService,
            NjzSendService njzSendService
    ) {
        this.userService = userService;
        this.hobbyTagService = hobbyTagService;
        this.njzSendService = njzSendService;
    }

    @GetMapping("/")
    public String getIntroducePage(Authentication authentication, HttpServletRequest request) {
        return "client/introduce_page";
    }

    @GetMapping("/home")
    public String home(Model model, HttpServletRequest request, Authentication authentication) {

        return "client/home/home";
    }

    @PostMapping("/create-hobbytag")
    public String createHobbyTag(HttpSession session) {
//        hobbyTagService.addTestHobby();
        session.setAttribute("cac", "cac");
        return "client/home/home";
    }

    @PostMapping("/add-tag-to-user")
    public String addTagToUser(HttpSession session) {
//        hobbyTagService.addTagToUser();
        String c = String.valueOf(session.getAttribute("cac"));
        System.out.println(c);
        return "client/home/home";
    }

    @PostMapping("/fetch")
    public String fetch() {
//        hobbyTagService.fetch();
        njzSendService.addCrush();
        return "client/home/home";
    }

    @PostMapping("/remove-hobbytag")
    public String removeHobbyTag() {
//        hobbyTagService.removeHobby(1);
        njzSendService.getCrushList();
        return "client/home/home";
    }

    @PostMapping("/add-crush-to-list")
    public void addCrushToList(HttpServletRequest request) {

    }
}
