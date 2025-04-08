package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.NjzKey;
import hoangvacban.demo.project_newjeans.entity.NjzSend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NjzSendRepository extends JpaRepository<NjzSend, NjzKey> {
}
