package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.Role;
import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.repository.OtpCodeRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final PasswordEncoder passwordEncoder;
    private final OtpCodeRepository otpCodeRepository;

    public UserService(
            UserRepository userRepository,
            RoleService roleService,
            ModelMapper modelMapper,
            UploadService uploadService,
            UserImagesService userImagesService,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            OtpCodeRepository otpCodeRepository) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.uploadService = uploadService;
        this.userImagesService = userImagesService;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.otpCodeRepository = otpCodeRepository;
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }


    @Transactional
    public void signUpUser(UserDTO userDTO) {
        try {
            Optional<User> user = userRepository.findByEmail(userDTO.getEmail());

            if (user.isPresent()) {
                throw new BadCredentialsException("User is already exist");
            }

            validatePasswordMatch(userDTO);
            verifyAndRegisterNewUser(userDTO);
        } catch (Exception e) {
            log.atError().log(e.getMessage());
        }
    }

    private void validatePasswordMatch(UserDTO userDTO) {
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new BadCredentialsException("Passwords do not match");
        }
    }

    private void verifyAndRegisterNewUser(UserDTO userDTO) {
        if (emailService.verifyEmail(userDTO.getEmail(), userDTO.getOtp())) {
            registerNewUser(userDTO);
        }
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

    public void createUser() {
        User admin = new User();
        admin.setUsername("admin cac lon");
        admin.setEmail("mhoanga1@gmail.com");
        admin.setGender(true);
        admin.setNation("");
        admin.setBirthday("123");
        admin.setFinishSetUpProfile(false);
        admin.setRole(roleService.findByName("USER"));
        admin.setPassword(passwordEncoder.encode("123123"));
        userRepository.save(admin);
    }

    public void createUser1() {
        User admin = new User();
        admin.setUsername("admin cac lon");
        admin.setEmail("abc@gmail.com");
        admin.setGender(true);
        admin.setNation("");
        admin.setBirthday("123");
        admin.setFinishSetUpProfile(true);
        admin.setRole(roleService.findByName("USER"));
        admin.setPassword(passwordEncoder.encode("123123"));
        userRepository.save(admin);
    }

    public void createUserMulti() {
        for (int i = 1; i <= 10; i++) {
            User admin = new User();
            admin.setUsername("admin cac lon " + i);
            admin.setEmail("abc" + i + "@gmail.com");
            admin.setGender(true);
            admin.setBirthday("123");
            admin.setFinishSetUpProfile(true);
            admin.setRole(roleService.findByName("USER"));
            admin.setPassword(passwordEncoder.encode("123123"));
            userRepository.save(admin);
        }
    }

    public void createAdmin() {
        User admin = new User();
        admin.setUsername("admin cac lon");
        admin.setEmail("admin@gmail.com");
        admin.setGender(true);
        admin.setNation("");
        admin.setBirthday("123");
        admin.setRole(roleService.findByName("ADMIN"));
        admin.setPassword(passwordEncoder.encode("123123"));
        userRepository.save(admin);
    }

}
