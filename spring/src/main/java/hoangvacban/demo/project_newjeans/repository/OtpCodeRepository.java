package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.domain.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpCodeRepository extends JpaRepository<OtpCode, Long> {
    Optional<OtpCode> findByEmail(String otpCode);
}
