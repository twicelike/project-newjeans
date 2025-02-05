package hoangvacban.demo.project_newjeans.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Constraint(validatedBy = UserValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface UserChecked {
    String message() default "User validation failed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
