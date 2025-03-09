package hoangvacban.demo.project_newjeans.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String realName;
    private String password;
    private String email;
    private long createdDate;

    private String phoneNumber;
    private boolean gender;
    private String nation;
    private String birthday;
    private String avatar;
    private long updatedDate;

    private boolean isFinishSetUpProfile;

    @OneToMany(mappedBy = "user")
    private List<UserImage> images;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<DeviceMetadata> deviceMetadata;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender=" + gender +
                ", location='" + nation + '\'' +
                ", birthday='" + birthday + '\'' +
                ", images=" + images +
                ", role=" + role +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User user) {
            return this.getId() == user.getId();
        } else return false;
    }
}

