package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
    public String getIntroducePage(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            System.out.println("CAC LON 1");
        } else {
            System.out.println("DAU CAC 1");
        }
        return "client/introduce_page";
    }

    @GetMapping("/home")
    public String home(HttpSession session, Model model, HttpServletRequest request, Authentication authentication) {
        model.addAttribute("user", authentication.getName());
//        Enumeration<String> headerNames = request.getHeaderNames();
//
//        if (authentication.getPrincipal() instanceof User) {
//            System.out.println("CAC");
//            System.out.println(authentication.getPrincipal());
//        } else {
//            System.out.println("LON");
//        }
//
//        while (headerNames.hasMoreElements()) {
//            String headerName = headerNames.nextElement();
//            String headerValue = request.getHeader(headerName);
//            System.out.println(headerName + ": " + headerValue);
//        }
        return "client/home/home";
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
