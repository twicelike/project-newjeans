package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.Phase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhaseRepository extends JpaRepository<Phase, Long> {
}
