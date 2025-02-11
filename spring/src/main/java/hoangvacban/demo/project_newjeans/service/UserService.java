package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final ModelMapper modelMapper;
    private final UploadService uploadService;

    public UserService(UserRepository userRepository, RoleService roleService, ModelMapper modelMapper, UploadService uploadService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.uploadService = uploadService;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }

    public void signUpUser(UserDTO user, OAuth2User principal, MultipartFile[] images) {
        User newUser = new User();
        System.out.println(images.length);
        for (MultipartFile image : images) {
            System.out.println(uploadService.saveUploadFile(image, "userImages"));
        }
        newUser.setRole(roleService.findByName("USER"));
        newUser.setAvatar(principal.getAttribute("picture"));
        newUser = modelMapper.map(user, User.class);
        System.out.println(newUser);
//        userRepository.save(newUser);
    }

}
