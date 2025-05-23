package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.dto.UserNjz;
import hoangvacban.demo.project_newjeans.entity.NjzKey;
import hoangvacban.demo.project_newjeans.entity.NjzSend;
import hoangvacban.demo.project_newjeans.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NjzSendRepository extends JpaRepository<NjzSend, NjzKey> {

    @Query("SELECT COUNT(n) > 0 FROM NjzSend n WHERE " +
            "(n.user = :user AND n.crush = :crush) OR " +
            "(n.user = :crush AND n.crush = :user)")
    boolean existsNjz(@Param("user") User user, @Param("crush") User crush);
}
