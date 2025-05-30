package hoangvacban.demo.project_newjeans.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "surveys")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @JsonIgnore
    private Set<Question> questions = new HashSet<>();
}
