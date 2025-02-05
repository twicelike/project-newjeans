package hoangvacban.demo.project_newjeans.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_images")
@Getter
@Setter
public class UserImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
