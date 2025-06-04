package hoangvacban.demo.project_newjeans.dto;


import hoangvacban.demo.project_newjeans.util.validation.profile.ProfileConstraint;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@ProfileConstraint
@Getter
@Setter
@ToString
public class ProfileDTO {
    private String bio;
    private String gender;
    private String location;
    private String educationLevel;
    private String age;
    private String firstName;
    private String lastName;
    private MultipartFile avatar;
    private MultipartFile image1;
    private MultipartFile image2;
    private MultipartFile image3;
    private int[] hobbies;
}
