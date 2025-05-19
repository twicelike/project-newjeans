package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.Crush;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.exception.UserExistException;
import hoangvacban.demo.project_newjeans.repository.CrushRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrushService {
    private final CrushRepository crushRepository;
    private final UserRepository userRepository;

    public CrushService(
            CrushRepository crushRepository,
            UserRepository userRepository
    ) {
        this.crushRepository = crushRepository;
        this.userRepository = userRepository;
    }

    public void addCrush(long crusherId, long crushedId) {
        Optional<User> crushOptional = userRepository.findById(crusherId);
        if (crushOptional.isPresent()) {
            Optional<User> crushedOptional = userRepository.findById(crushedId);
            if (crushedOptional.isPresent()) {
                Crush crush = new Crush();
                crush.setCrusher(crushOptional.get());
                crush.setCrushed(crushedOptional.get());
                crushRepository.save(crush);
            } else {
                throw new UserExistException("User not found");
            }
        } else {
            throw new UserExistException("User not found");
        }
    }

    public void removeCrush(long crusherId, long crushedId) {
        userRepository.findById(crusherId)
                .orElseThrow(() -> new UserExistException("User not found"));

        userRepository.findById(crushedId)
                .orElseThrow(() -> new UserExistException("User not found"));

        Optional<Crush> crush = crushRepository.findMutualCrush(crusherId, crushedId);

        crush.ifPresent(crushRepository::delete);
    }

//    public List<User> findAllCrushes(long crusherId) {
//        return crushRepository.getAllCrushes(crusherId);
//    }
}
