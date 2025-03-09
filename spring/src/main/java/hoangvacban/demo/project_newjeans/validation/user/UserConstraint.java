package hoangvacban.demo.project_newjeans.validation.user;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UserValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserConstraint {
    String message() default "User validation failed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
