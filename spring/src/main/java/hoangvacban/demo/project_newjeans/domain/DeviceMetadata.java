package hoangvacban.demo.project_newjeans.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "device_metadata")
@Getter
@Setter
@EqualsAndHashCode
public class DeviceMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Exclude
    private long id;

    private String osName;
    private String agentName; // browser username
    private String ipAddress;
    private String city;
    private String country;

    @EqualsAndHashCode.Exclude
    private long lastLoggedIn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
