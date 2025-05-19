package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.Crush;
import hoangvacban.demo.project_newjeans.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CrushRepository extends JpaRepository<Crush, Long> {
    @Query("SELECT c " +
            "FROM Crush c " +
            "WHERE (c.crusher.id = :crusherId AND c.crushed.id = :crushedId) " +
            "OR (c.crushed.id = :crusherId AND c.crusher.id = :crushedId)")
    Optional<Crush> findMutualCrush(@Param("crusherId") Long crusherId, @Param("crushedId") Long crushedId);

//    @Query("SELECT CASE WHEN c.crusher.id = :crusherId THEN c.crushed ELSE c.crusher END " +
//            "FROM Crush c " +
//            "WHERE c.crusher.id = :crusherId OR c.crushed = :crusherId")
//    List<User> getAllCrushes(@Param("crusherId") Long crusherId);

    @Query("SELECT c.crushed FROM Crush c WHERE c.crusher.id = :crusherId")
    List<User> getCrushesByCrusher(@Param("crusherId") Long crusherId);

    @Query("SELECT c.crusher FROM Crush c WHERE c.crushed.id = :crusherId")
    List<User> getCrushersOfUser(@Param("crusherId") Long crusherId);
}
