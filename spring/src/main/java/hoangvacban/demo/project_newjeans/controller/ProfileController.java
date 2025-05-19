package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.ProfileDTO;
import hoangvacban.demo.project_newjeans.entity.HobbyTag;
import hoangvacban.demo.project_newjeans.service.HobbyTagService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

import static hoangvacban.demo.project_newjeans.util.Constants.SET_UP_PROFILE_ENDPOINT;
import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;


@Controller
public class ProfileController {


    private static final Logger log = LoggerFactory.getLogger(ProfileController.class);
    private final HobbyTagService hobbyTagService;
    private final UserService userService;

    public ProfileController(
            HobbyTagService hobbyTagService,
            UserService userService
    ) {
        this.hobbyTagService = hobbyTagService;
        this.userService = userService;
    }

    @GetMapping("/profile")
    public String profile() {

        return "client/profile/profile";
    }

    @PostMapping("/save-profile")
    public String saveProfile(
            @Valid @ModelAttribute("profileDTO") ProfileDTO profileDTO,
            BindingResult result,
            HttpServletRequest request
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            for (String error : errors) {
                log.error(error);
            }
            return "client/auth/set_up_profile";
        }

        System.out.println(profileDTO.getImage1().getOriginalFilename());
        System.out.println(profileDTO.getImage2().getOriginalFilename());
        System.out.println(profileDTO.getImage3().getOriginalFilename());


        System.out.println(profileDTO);
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "client/auth/set_up_profile";
        }

        long userId = (long) session.getAttribute(USER_ID);
        userService.saveProfile(profileDTO, userId);

//        return "client/auth/set_up_profile";
        return "redirect:/main";
    }

    @GetMapping(SET_UP_PROFILE_ENDPOINT)
    public String setUpProfile(Model model) {
        List<HobbyTag> hobbyTagList = hobbyTagService.getAll();
        model.addAttribute("hobbyTagList", hobbyTagList);
        model.addAttribute("profileDTO", new ProfileDTO());
        return "client/auth/set_up_profile";
    }
}
