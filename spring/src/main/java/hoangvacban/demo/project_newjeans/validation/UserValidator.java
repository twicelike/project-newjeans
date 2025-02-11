package hoangvacban.demo.project_newjeans.validation;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Service;

@Service
public class UserValidator implements ConstraintValidator<UserChecked, UserDTO> {

    @Override
    public boolean isValid(UserDTO user, ConstraintValidatorContext context) {
        if (user.getName() == null || user.getName().isEmpty()) {
            context.buildConstraintViolationWithTemplate("Username is required")
                    .addPropertyNode("name").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        if (user.getPassword().length() < 6) {
            context.buildConstraintViolationWithTemplate("Password must be at least 6 characters")
                    .addPropertyNode("password").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        if (user.getPhoneNumber() == null || user.getPhoneNumber().isEmpty()) {
            context.buildConstraintViolationWithTemplate("Phone number is required")
                    .addPropertyNode("phoneNumber").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        if (user.getLocation() == null || user.getLocation().isEmpty()) {
            context.buildConstraintViolationWithTemplate("Location is required")
                    .addPropertyNode("location").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }

        if (user.getBirthday() == null || user.getBirthday().isEmpty()) {
            context.buildConstraintViolationWithTemplate("Birthday is required")
                    .addPropertyNode("birthday").addConstraintViolation()
                    .disableDefaultConstraintViolation();
            return false;
        }
        return true;
    }
}
