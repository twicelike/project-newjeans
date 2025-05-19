package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhaseKey {
    @Column(name = "user1_id")
    private long user1Id;

    @Column(name = "user2Id")
    private long user2Id;
}
