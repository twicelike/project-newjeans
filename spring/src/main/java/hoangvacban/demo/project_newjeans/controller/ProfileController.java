package hoangvacban.demo.project_newjeans.controller;

import hoangvacban.demo.project_newjeans.dto.ProfileDTO;
import hoangvacban.demo.project_newjeans.dto.request.ChangePasswordDTO;
import hoangvacban.demo.project_newjeans.entity.HobbyTag;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.entity.UserImage;
import hoangvacban.demo.project_newjeans.service.HobbyTagService;
import hoangvacban.demo.project_newjeans.service.NjzSendService;
import hoangvacban.demo.project_newjeans.service.UserImagesService;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.SET_UP_PROFILE_ENDPOINT;
import static hoangvacban.demo.project_newjeans.util.Constants.USER_ID;


@Controller
public class ProfileController {


    private static final Logger log = LoggerFactory.getLogger(ProfileController.class);
    private final HobbyTagService hobbyTagService;
    private final UserService userService;
    private final UserImagesService userImagesService;
    private final NjzSendService njzSendService;

    public ProfileController(
            HobbyTagService hobbyTagService,
            UserService userService,
            UserImagesService userImagesService,
            NjzSendService njzSendService) {
        this.hobbyTagService = hobbyTagService;
        this.userService = userService;
        this.userImagesService = userImagesService;
        this.njzSendService = njzSendService;
    }

    @GetMapping("/profile")
    public String profile(Model model, HttpSession session) {
        long id = (long) session.getAttribute(USER_ID);

        Optional<User> userOptional = userService.getUserById(id);
        model.addAttribute("passwordDTO", new ChangePasswordDTO());

        userOptional.ifPresent(user -> {
            model.addAttribute("user", user);
            List<UserImage> images = userImagesService.getAllUserImages(user);
            model.addAttribute("images", images);
            model.addAttribute("hobbies", user.getHobbyTags());

        });


        return "client/profile/profile";
    }

    @GetMapping("/profile/{username}")
    public String profile(@PathVariable String username, Model model, HttpSession session) {
        Optional<User> userOptional = userService.getUserByUsername(username);
        long id = (long) session.getAttribute(USER_ID);
        model.addAttribute(USER_ID, id);

        if (userOptional.isPresent()) {
            model.addAttribute("user", userOptional.get());
            List<UserImage> images = userImagesService.getAllUserImages(userOptional.get());
            model.addAttribute("images", images);
            model.addAttribute("hobbies", userOptional.get().getHobbyTags());
            model.addAttribute("avatar", session.getAttribute("avatar"));
            model.addAttribute("username", session.getAttribute("username"));
            if (njzSendService.isFriend(id, userOptional.get().getId())) {
                model.addAttribute("isFriend", true);
            } else {
                model.addAttribute("isFriend", false);
            }
        } else {
            return "error/404";
        }

        return "client/profile/user_profile";
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
