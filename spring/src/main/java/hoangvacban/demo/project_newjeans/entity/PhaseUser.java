package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "phase_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhaseUser {
    @EmbeddedId
    private PhaseKey phaseKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user1Id")
    @JoinColumn(name = "user1_id")
    private User user1Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user2Id")
    @JoinColumn(name = "user2_id")
    private User user2Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phase_id")
    private Phase phaseId;
}
