package hoangvacban.demo.project_newjeans.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResetPasswordDTO {
    private String email;
    private String password;
    private String confirmPassword;
    private String otp;
}
