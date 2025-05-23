package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserNjz;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.HobbyTagService;
import hoangvacban.demo.project_newjeans.service.NjzSendService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;

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
    public String getHomePage(Model model, HttpSession session) {
        test(model, session);
        List<User> users = userService.getUserList();
        model.addAttribute("users", users);
        return "client/home/home";
    }

    @GetMapping("/njz-request")
    public String getNjzRequest(Model model, HttpSession session) {
        test(model, session);
        return "client/home/njz_request";
    }

    private void test(Model model, HttpSession session) {
        long id = (long) session.getAttribute(USER_ID);

        Optional<User> userOptional = userService.getUserById(id);
        List<UserNjz> send = njzSendService.getNjzSend(id);
        List<UserNjz> come = njzSendService.getNjzCome(id);

        userOptional.ifPresent(user -> {
            model.addAttribute("user", user);
        });

        model.addAttribute("send", send);
        model.addAttribute("come", come);
    }

}
