package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedBack, Long> {
}
