package hoangvacban.demo.project_newjeans.util.validation.user;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserValidator implements ConstraintValidator<UserConstraint, UserDTO> {

    private final UserRepository userRepository;

    public UserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private boolean isUsernameValid(char c) {
        return Character.isLetterOrDigit(c) || c == '-' || c == '_';
    }

    @Override
    public boolean isValid(UserDTO user, ConstraintValidatorContext context) {
        boolean valid = true;
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            context.buildConstraintViolationWithTemplate("Email can't be empty")
                    .addPropertyNode("email").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            valid = false;
        }

        if (user.getUsername() == null || user.getUsername().length() < 6) {
            context.buildConstraintViolationWithTemplate("Username must be at least 6 characters")
                    .addPropertyNode("username").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            valid = false;
        } else {
            for (char ch : user.getUsername().toCharArray()) {
                if (!isUsernameValid(ch)) {
                    context.buildConstraintViolationWithTemplate("Username mustn't contain special characters")
                            .addPropertyNode("username").addConstraintViolation()
                            .disableDefaultConstraintViolation();
                    valid = false;
                }
            }
            if (valid) {
                Optional<User> us = userRepository.findByUsername(user.getUsername());
                if (us.isPresent()) {
                    context.buildConstraintViolationWithTemplate("Username is already in use")
                            .addPropertyNode("username").addConstraintViolation()
                            .disableDefaultConstraintViolation();
                    valid = false;
                }
            }
        }

        if (valid) {
            boolean userWithEmail = userRepository.existsByEmail(user.getEmail());
            if (userWithEmail) {
                context.buildConstraintViolationWithTemplate("Email is already in use")
                        .addPropertyNode("email").addConstraintViolation()
                        .disableDefaultConstraintViolation();
                valid = false;
            }
        }

        if (valid) {
            boolean userWithEmail = userRepository.existsByUsername(user.getUsername());
            if (userWithEmail) {
                context.buildConstraintViolationWithTemplate("Username is already in use")
                        .addPropertyNode("username").addConstraintViolation()
                        .disableDefaultConstraintViolation();
                valid = false;
            }
        }

        if (user.getPassword().length() < 6) {
            context.buildConstraintViolationWithTemplate("Password must be at least 6 characters")
                    .addPropertyNode("password").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            valid = false;
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            context.buildConstraintViolationWithTemplate("Password and confirm password do not match")
                    .addPropertyNode("confirmPassword").addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }

        return valid;
    }
}
