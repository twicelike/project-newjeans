package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.ProfileDTO;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.dto.request.ChangePasswordDTO;
import hoangvacban.demo.project_newjeans.dto.request.ResetPasswordDTO;
import hoangvacban.demo.project_newjeans.entity.Role;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final UploadService uploadService;
    private final UserImagesService userImagesService;
    private final EmailService emailService;
    private final HobbyTagService hobbyTagService;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleService roleService,
            UploadService uploadService,
            UserImagesService userImagesService,
            EmailService emailService,
            HobbyTagService hobbyTagService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.uploadService = uploadService;
        this.userImagesService = userImagesService;
        this.emailService = emailService;
        this.hobbyTagService = hobbyTagService;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getUserList(long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            return userRepository.getUserList(userOptional.get());
        }
        return new ArrayList<>();
    }

    public List<User> getSearchList(String query) {
        String[] criteria = query.split(" ");
        String firstName;
        String lastName;
        if (criteria.length > 1) {
            firstName = criteria[0];
            lastName = criteria[1];
        } else {
            firstName = criteria[0];
            lastName = criteria[0];
        }
        List<User> searchUsers = userRepository.getSearchList(firstName, lastName);


        return searchUsers;
    }

    @Transactional
    public User signUpUser(UserDTO userDTO) {
        try {
            return verifyAndRegisterNewUser(userDTO);
        } catch (Exception e) {
            return null;
        }
    }

    private boolean validatePasswordMatch(UserDTO userDTO) {
        return userDTO.getPassword().equals(userDTO.getConfirmPassword());
    }

    private User verifyAndRegisterNewUser(UserDTO userDTO) {
        if (validatePasswordMatch(userDTO)) {
            return registerNewUser(userDTO);
        }
        return null;
    }

    private User registerNewUser(UserDTO userDTO) {
        User signupUser = new User();
        Role role = roleService.findByName("USER");

        signupUser.setFinishSetUpProfile(false);
        signupUser.setEmail(userDTO.getEmail());
        signupUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        signupUser.setRole(role);
        signupUser.setUsername(userDTO.getUsername());
        signupUser.setCreatedDate(LocalDateTime.now());

        return userRepository.save(signupUser);
    }

    @Transactional
    public void saveProfile(ProfileDTO profileDTO, long userId) {
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(userDTO -> {
            userDTO.setGender(profileDTO.getGender().equals("male"));
            userDTO.setLocation(profileDTO.getLocation().isBlank() ? "" : profileDTO.getLocation());
            userDTO.setEducationLevel(profileDTO.getEducationLevel().isBlank() ? "" : profileDTO.getLocation());
            userDTO.setAge(Integer.parseInt(profileDTO.getAge().isBlank() ? "" : profileDTO.getAge()));
            userDTO.setBio(profileDTO.getBio().isBlank() ? "" : profileDTO.getBio());
            userDTO.setFirstName(profileDTO.getFirstName().isBlank() ? "" : profileDTO.getFirstName());
            userDTO.setLastName(profileDTO.getLastName().isBlank() ? "" : profileDTO.getLastName());

            if (profileDTO.getHobbies() != null) {
                hobbyTagService.addHobbyToUser(userDTO, profileDTO.getHobbies());
            }

            List<MultipartFile> files = new ArrayList<>();

            if (profileDTO.getImage1() != null) {
                files.add(profileDTO.getImage1());
            }

            if (profileDTO.getImage2() != null) {
                files.add(profileDTO.getImage2());
            }

            if (profileDTO.getImage3() != null) {
                files.add(profileDTO.getImage3());
            }

            List<String> images = userImagesService.saveUserImages(userDTO, files);

            userDTO.setAvatar(uploadService.saveUploadFile(profileDTO.getAvatar(), "userImages"));

            if (images.size() == 1) {
                userDTO.setImage1(images.getFirst());
            } else if (images.size() == 2) {
                userDTO.setImage1(images.getFirst());
                userDTO.setImage2(images.getLast());
            } else if (images.size() == 3) {
                userDTO.setImage1(images.getFirst());
                userDTO.setImage2(images.get(1));
                userDTO.setImage3(images.getLast());
            }

            userDTO.setFinishSetUpProfile(true);

            userRepository.save(userDTO);
        });
    }

    public boolean changePassword(long userId, ChangePasswordDTO passwordDTO) {
        if (!passwordDTO.getNewPassword().equals(passwordDTO.getConfirmPassword())) {
            return false;
        }
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return false;
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(passwordDTO.getOldPassword(), user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(passwordDTO.getNewPassword()));
        userRepository.save(user);
        return true;
    }

    public String resetPassword(ResetPasswordDTO resetPasswordDTO) {
        if (!resetPasswordDTO.getPassword().equals(resetPasswordDTO.getConfirmPassword())) {
            return "Passwords do not match!";
        }

        String emailMessage = emailService.verifyEmail(resetPasswordDTO.getEmail(), resetPasswordDTO.getOtp());
        if (emailMessage.contains("!")) {
            return emailMessage;
        }

        Optional<User> user = userRepository.findByEmail(resetPasswordDTO.getEmail());

        if (user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(resetPasswordDTO.getPassword()));
            userRepository.save(user.get());
            return "Yes sir";
        }

        return "Email is not registered!";
    }

    public void createAdmin() {
        User user = new User();
        Role role = roleService.findByName("ADMIN");
        user.setFinishSetUpProfile(true);
        user.setRole(role);
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("123123"));
        user.setAvatar("1747838259862-1.jpg");
        user.setGender(true);
        user.setEmail("admin@gmail.com");
        userRepository.save(user);
    }
}
