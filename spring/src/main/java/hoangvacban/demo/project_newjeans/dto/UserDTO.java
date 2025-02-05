package hoangvacban.demo.project_newjeans.dto;

import hoangvacban.demo.project_newjeans.validation.UserChecked;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@UserChecked
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String name;
    private String password;
    private String email;
    private String phoneNumber;
    private boolean gender;
    private String location;
    private String birthday;
    private String avatar;
}
