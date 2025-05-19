package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
