package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.service.HobbyTagService;
import hoangvacban.demo.project_newjeans.service.NjzSendService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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

    @GetMapping("/main")
    public String getHomePage() {

        return "client/home/home";
    }

}
