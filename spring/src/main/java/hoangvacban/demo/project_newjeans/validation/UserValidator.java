package hoangvacban.demo.project_newjeans.validation;

import hoangvacban.demo.project_newjeans.dto.UserDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Service;

@Service
public class UserValidator implements ConstraintValidator<UserChecked, UserDTO> {

    @Override
    public boolean isValid(UserDTO value, ConstraintValidatorContext context) {
        return false;
    }
}
