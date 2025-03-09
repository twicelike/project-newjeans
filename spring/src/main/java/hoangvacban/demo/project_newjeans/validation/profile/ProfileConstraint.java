package hoangvacban.demo.project_newjeans.validation.profile;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ProfileValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ProfileConstraint {
    String message() default "Profile validation failed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
