package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "phases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private int level;
    private String iconUrl;

    @OneToMany(mappedBy = "phase")
    private List<NjzSend> njzs;
}
