package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.UserService;
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
        return "client/introduce_page";
    }

    @GetMapping("/home")
    public String home() {
        return "client/home";
    }

    @GetMapping("/set-up-profile")
    public String setUpProfile(Model model) {
//        if (userService.isEmailExist(token.getPrincipal().getAttribute("email"))) {
//            return "redirect:/home";
//        }
//        System.out.println(token.getPrincipal());
        model.addAttribute("user", new UserDTO());
        return "client/set_up_profile";
    }
}
