package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.dto.UserMessageDTO;
import hoangvacban.demo.project_newjeans.entity.Message;
import hoangvacban.demo.project_newjeans.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT new hoangvacban.demo.project_newjeans.dto.UserMessageDTO(" +
            "CASE WHEN n.user = :user THEN n.crush.id ELSE n.user.id END, " +
            "CASE WHEN n.user = :user THEN n.crush.username ELSE n.user.username END, " +
            "CASE WHEN n.user = :user THEN n.crush.avatar ELSE n.user.avatar END," +
            "n.phase.iconUrl )" +
            "FROM NjzSend n " +
            "WHERE (n.crush = :user OR n.user = :user) AND n.status = 'ACCEPT'")
    List<UserMessageDTO> findAllAcceptedNjzSend(@Param("user") User user);

    @Query("SELECT m FROM Message m WHERE " +
            "(m.user = :user AND m.receiver = :receiver) OR " +
            "(m.user = :receiver AND m.receiver = :user) " +
            "ORDER BY m.timestamp")
    List<Message> getAllMessage(@Param("user") User user, @Param("receiver") User receiver);

}
