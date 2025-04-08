package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.HobbyTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HobbyTagRepository extends JpaRepository<HobbyTag, Integer> {
}
