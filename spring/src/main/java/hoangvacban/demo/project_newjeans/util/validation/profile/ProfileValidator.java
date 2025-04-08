package hoangvacban.demo.project_newjeans.util.validation.profile;

import hoangvacban.demo.project_newjeans.dto.ProfileDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Service;

@Service
public class ProfileValidator implements ConstraintValidator<ProfileConstraint, ProfileDTO> {

    @Override
    public boolean isValid(ProfileDTO value, ConstraintValidatorContext context) {
        return false;
    }
}
