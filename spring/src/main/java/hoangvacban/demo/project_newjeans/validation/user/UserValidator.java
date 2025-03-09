package hoangvacban.demo.project_newjeans.validation.user;

import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.dto.UserDTO;
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

    @Override
    public boolean isValid(UserDTO user, ConstraintValidatorContext context) {
        if (user.getUsername().length() < 6) {
            context.buildConstraintViolationWithTemplate("Username must be at least 6 characters")
                    .addPropertyNode("username").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        for (char ch : user.getUsername().toCharArray()) {
            if (ch < 'A' || ch > 'z') {
                context.buildConstraintViolationWithTemplate("Username mustn't contain special characters except _")
                        .addPropertyNode("username").addConstraintViolation()
                        .disableDefaultConstraintViolation();
                return false;
            }
        }

        if (user.getPassword().length() < 6) {
            context.buildConstraintViolationWithTemplate("Password must be at least 6 characters")
                    .addPropertyNode("password").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            context.buildConstraintViolationWithTemplate("Password and confirm password do not match")
                    .addPropertyNode("password").addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }

        Optional<User> userOptional = userRepository.findByRealName(user.getRealName());

        if (userOptional.isPresent()) {
            context.buildConstraintViolationWithTemplate("Real name already exists")
                    .addPropertyNode("realName").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        // email


        return true;
    }
}
