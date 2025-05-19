package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.ProfileDTO;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.entity.Role;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.UserImagesRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final ModelMapper modelMapper;
    private final UploadService uploadService;
    private final UserImagesService userImagesService;
    private final EmailService emailService;
    private final HobbyTagService hobbyTagService;
    private final UserImagesRepository imagesRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleService roleService,
            ModelMapper modelMapper,
            UploadService uploadService,
            UserImagesService userImagesService,
            EmailService emailService,
            HobbyTagService hobbyTagService,
            UserImagesRepository imagesRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.uploadService = uploadService;
        this.userImagesService = userImagesService;
        this.emailService = emailService;
        this.hobbyTagService = hobbyTagService;
        this.imagesRepository = imagesRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }


    @Transactional
    public boolean signUpUser(UserDTO userDTO) {
        try {
            boolean valid1, valid2;
            valid1 = validatePasswordMatch(userDTO);
            valid2 = verifyAndRegisterNewUser(userDTO);
            return (valid1 && valid2);
        } catch (Exception e) {
            log.atError().log(e.getMessage());
            return false;
        }
    }

    private boolean validatePasswordMatch(UserDTO userDTO) {
        return userDTO.getPassword().equals(userDTO.getConfirmPassword());
    }

    private boolean verifyAndRegisterNewUser(UserDTO userDTO) {
        if (emailService.verifyEmail(userDTO.getEmail(), userDTO.getOtp())) {
            registerNewUser(userDTO);
            return true;
        }
        return false;
    }


    private void registerNewUser(UserDTO userDTO) {
        User signupUser = new User();
        Role role = roleService.findByName("USER");

        signupUser.setFinishSetUpProfile(false);
        signupUser.setEmail(userDTO.getEmail());
        signupUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        signupUser.setRole(role);
        signupUser.setCreatedDate(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));

        userRepository.save(signupUser);
    }

    @Transactional
    public void saveProfile(ProfileDTO profileDTO, long userId) {
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(userDTO -> {
            userDTO.setUsername(profileDTO.getUsername());
            userDTO.setGender(profileDTO.getGender().equals("maie"));
            userDTO.setLocation(profileDTO.getLocation());
            userDTO.setEducationLevel(profileDTO.getEducationLevel());
            userDTO.setAge(Integer.parseInt(profileDTO.getAge()));
            userDTO.setBio(profileDTO.getBio());
            userDTO.getHobbyTags().clear();

            hobbyTagService.addHobbyToUser(userDTO, profileDTO.getHobbies());
            userImagesService.saveUserImages(userDTO,
                    new MultipartFile[]{profileDTO.getImage1(), profileDTO.getImage2(), profileDTO.getImage3()});

            userDTO.setFinishSetUpProfile(true);

            userRepository.save(userDTO);
        });
    }

//    public void createUser() {
//        User admin = new User();
//        admin.setUsername("admin cac lon");
//        admin.setEmail("mhoanga1@gmail.com");
//        admin.setGender(true);
//        admin.setNation("");
//        admin.setBirthday("123");
//        admin.setFinishSetUpProfile(false);
//        admin.setRole(roleService.findByName("USER"));
//        admin.setPassword(passwordEncoder.encode("123123"));
//        userRepository.save(admin);
//    }
//
//    public void createUser1() {
//        User admin = new User();
//        admin.setUsername("admin cac lon");
//        admin.setEmail("abc@gmail.com");
//        admin.setGender(true);
//        admin.setNation("");
//        admin.setBirthday("123");
//        admin.setFinishSetUpProfile(true);
//        admin.setRole(roleService.findByName("USER"));
//        admin.setPassword(passwordEncoder.encode("123123"));
//        userRepository.save(admin);
//    }
//
//    public void createUserMulti() {
//        for (int i = 1; i <= 10; i++) {
//            User admin = new User();
//            admin.setUsername("admin cac lon " + i);
//            admin.setEmail("abc" + i + "@gmail.com");
//            admin.setGender(true);
//            admin.setBirthday("123");
//            admin.setFinishSetUpProfile(true);
//            admin.setRole(roleService.findByName("USER"));
//            admin.setPassword(passwordEncoder.encode("123123"));
//            userRepository.save(admin);
//        }
//    }
//
//    public void createAdmin() {
//        User admin = new User();
//        admin.setUsername("admin cac lon");
//        admin.setEmail("admin@gmail.com");
//        admin.setGender(true);
//        admin.setNation("");
//        admin.setBirthday("123");
//        admin.setRole(roleService.findByName("ADMIN"));
//        admin.setPassword(passwordEncoder.encode("123123"));
//        userRepository.save(admin);
//    }

}
