package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("SELECT u FROM User u WHERE u != :user AND u.role.name != \'ADMIN\' ORDER BY RAND()")
    List<User> getUserList(@Param("user") User user);

    @Query("SELECT u FROM User u WHERE u.firstName LIKE CONCAT('%', :first, '%') OR u.lastName LIKE CONCAT('%', :second, '%')")
    List<User> getSearchList(@Param("first") String first, @Param("second") String second);
}
