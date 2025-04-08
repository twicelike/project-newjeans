package hoangvacban.demo.project_newjeans.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OtpCodeDTO {
    private String otpCode;
    private long timeStamp;
}
