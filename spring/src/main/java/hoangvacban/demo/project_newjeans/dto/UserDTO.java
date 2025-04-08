package hoangvacban.demo.project_newjeans.dto;

import hoangvacban.demo.project_newjeans.util.validation.user.UserConstraint;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@UserConstraint
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private String username;
    private String realName;
    private String password;
    private String confirmPassword;

    @Email
    private String email;
    private String otp;
}
