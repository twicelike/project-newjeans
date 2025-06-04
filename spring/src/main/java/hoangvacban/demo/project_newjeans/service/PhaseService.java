package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.Phase;
import hoangvacban.demo.project_newjeans.repository.PhaseRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PhaseService {

    private final PhaseRepository phaseRepository;

    public PhaseService(
            PhaseRepository phaseRepository
    ) {
        this.phaseRepository = phaseRepository;
    }

    void updatePhase(long id, String name, String iconUrl) {
        Optional<Phase> phase = phaseRepository.findById(id);
        if (phase.isPresent()) {
            phase.get().setName(name);
            phase.get().setIconUrl(iconUrl);
            phaseRepository.save(phase.get());
        }
    }
}
