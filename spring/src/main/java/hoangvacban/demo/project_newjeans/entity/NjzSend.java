package hoangvacban.demo.project_newjeans.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "njz_sends")
@Getter
@Setter
public class NjzSend {
    @EmbeddedId
    private NjzKey njzKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("crushId")
    @JoinColumn(name = "crush_id")
    private User crushId;

    private long sendDate;
    private String content;
    private String status;
}
