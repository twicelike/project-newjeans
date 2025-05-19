package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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

    // pre-set up
    private String username;
    private String password;
    private String email;
    private long createdDate;

    // set up
    private String bio;
    private String firstName;
    private String lastName;
    private boolean gender;
    private int age;
    private String location;
    private String avatar;
    private String educationLevel;
    private long updatedDate;

    // post set up
    private String school;
    private String working;

    private boolean isFinishSetUpProfile;

    @OneToMany(mappedBy = "user")
    private List<UserImage> images = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private Set<NjzSend> njzSends = new HashSet<>();

    @OneToMany(mappedBy = "crushId", fetch = FetchType.LAZY)
    private Set<NjzSend> njzCrushes = new HashSet<>();

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private Set<HobbyTag> hobbyTags = new HashSet<>();

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Survey> surveys = new HashSet<>();

    @OneToMany(mappedBy = "crusher", fetch = FetchType.LAZY)
    private Set<Crush> crushes = new HashSet<>();

    @OneToMany(mappedBy = "crushed", fetch = FetchType.LAZY)
    private Set<Crush> crushesSendTo = new HashSet<>();

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                ", location='" + location + '\'' +
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

    public void addHobbyTag(HobbyTag hobbyTag) {
        this.hobbyTags.add(hobbyTag);
        hobbyTag.getUsers().add(this);
    }
}

