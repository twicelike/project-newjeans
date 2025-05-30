package hoangvacban.demo.project_newjeans.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "njz_sends")
@Getter
@Setter
public class NjzSend {
    @EmbeddedId
    private NjzKey njzKey;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("crushId")
    @JoinColumn(name = "crush_id")
    private User crush;

    private LocalDateTime sendDate;
    private String content;
    private String status;

    @ManyToOne
    @JoinColumn(name = "phase_id")
    private Phase phase;
}
