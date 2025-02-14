package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.domain.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserImagesRepository extends JpaRepository<UserImage, Long> {
}
