package hoangvacban.demo.project_newjeans.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "device_metadata")
@Getter
@Setter
public class DeviceMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String osName;
    private String agentName; // browser name
    private String ipAddress;
    private String city;
    private String country;
    private LocalDateTime lastLoggedIn;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
