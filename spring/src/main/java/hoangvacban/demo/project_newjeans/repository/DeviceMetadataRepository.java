package hoangvacban.demo.project_newjeans.repository;

import hoangvacban.demo.project_newjeans.entity.DeviceMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceMetadataRepository extends JpaRepository<DeviceMetadata, Long> {
    List<DeviceMetadata> findByUserId(Long deviceId);

    Optional<DeviceMetadata> findTopByUserIdOrderByIdDesc(Long userId);
}
