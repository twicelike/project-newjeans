package hoangvacban.demo.project_newjeans.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NjzKey implements Serializable {
    @Column(name = "user_id")
    private long userId;

    @Column(name = "crush_id")
    private long crushId;
}
