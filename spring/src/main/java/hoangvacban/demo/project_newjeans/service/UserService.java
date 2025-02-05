package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;

    public UserService(UserRepository userRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }

    public void signUpUser(User user, OAuth2User principal) {
        user.setRole(roleService.findByName("USER"));
        user.setAvatar(principal.getAttribute("picture"));
        userRepository.save(user);
    }

}
