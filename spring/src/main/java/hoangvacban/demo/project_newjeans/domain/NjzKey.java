package hoangvacban.demo.project_newjeans.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class NjzKey implements Serializable {
    @Column(name = "user_id")
    private long userId;

    @Column(name = "crush_id")
    private long crushId;
}
