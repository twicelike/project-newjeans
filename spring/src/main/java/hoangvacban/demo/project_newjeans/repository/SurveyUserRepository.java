package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.Survey;
import hoangvacban.demo.project_newjeans.entity.SurveyUser;
import hoangvacban.demo.project_newjeans.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyUserRepository extends JpaRepository<SurveyUser, Long> {

    Optional<SurveyUser> findFirstBySenderAndParticipantOrderBySentDateDesc(User sender, User participant);


}
