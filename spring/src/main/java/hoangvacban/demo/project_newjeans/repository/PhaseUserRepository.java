package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.PhaseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhaseUserRepository extends JpaRepository<PhaseUser, Long> {
}
