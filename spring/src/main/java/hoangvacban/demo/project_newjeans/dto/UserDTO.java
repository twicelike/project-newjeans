package hoangvacban.demo.project_newjeans.dto;

import hoangvacban.demo.project_newjeans.util.validation.user.UserConstraint;
import jakarta.validation.constraints.Email;
import lombok.*;

@UserConstraint
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {
    private String username;
    private String password;
    private String confirmPassword;

    @Email
    private String email;
    private String otp;
}
