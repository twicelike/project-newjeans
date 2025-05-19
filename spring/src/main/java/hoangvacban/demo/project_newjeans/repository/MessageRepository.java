package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
