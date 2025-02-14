package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.domain.UserHobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHobbyRepository extends JpaRepository<UserHobby, Long> {

    List<UserHobby> findAllByHobbyTagId(int id);

}
