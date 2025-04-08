package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "otp_codes")
@Getter
@Setter
public class OtpCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String otpPassword;
    private long expiryTime;
    private String email;
}

