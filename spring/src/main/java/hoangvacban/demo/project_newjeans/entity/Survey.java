package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "surveys")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private long timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "onwer_id")
    private User user;

    @OneToMany(mappedBy = "survey",fetch = FetchType.LAZY)
    private Set<Question> questions = new HashSet<>();
}
