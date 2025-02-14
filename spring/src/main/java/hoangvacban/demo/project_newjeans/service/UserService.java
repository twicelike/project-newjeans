package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.Role;
import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final ModelMapper modelMapper;
    private final UploadService uploadService;
    private final UserImagesService userImagesService;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleService roleService,
            ModelMapper modelMapper,
            UploadService uploadService,
            UserImagesService userImagesService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.uploadService = uploadService;
        this.userImagesService = userImagesService;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }


    public void signUpUser(UserDTO user) {
        User newUser = modelMapper.map(user, User.class);
        Role role = roleService.findByName("USER");
        newUser.setRole(role);
//        newUser.setAvatar(principal.getAttribute("picture"));
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);
    }

    public void createAdmin() {
        User admin = new User();
        admin.setName("admin cac lon");
        admin.setEmail("admin@gmail.com");
        admin.setPhoneNumber("123123123");
        admin.setGender(true);
        admin.setLocation("");
        admin.setBirthday("123");
        admin.setRole(roleService.findByName("ADMIN"));
        admin.setPassword(passwordEncoder.encode("123123"));
        userRepository.save(admin);
    }

}
