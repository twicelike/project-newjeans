package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserImagesRepository extends JpaRepository<UserImage, Long> {

    public List<UserImage> findAllByUser(User user);
}
