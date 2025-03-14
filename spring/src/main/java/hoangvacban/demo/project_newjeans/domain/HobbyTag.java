package hoangvacban.demo.project_newjeans.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "hobby_tags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HobbyTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany
    @JoinTable
    private Set<User> users = new HashSet<>();
}
