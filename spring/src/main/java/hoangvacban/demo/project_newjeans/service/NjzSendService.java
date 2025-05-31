package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.UserNjz;
import hoangvacban.demo.project_newjeans.entity.NjzKey;
import hoangvacban.demo.project_newjeans.entity.NjzSend;
import hoangvacban.demo.project_newjeans.entity.Phase;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.NjzSendRepository;
import hoangvacban.demo.project_newjeans.repository.PhaseRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class NjzSendService {

    private final NjzSendRepository njzSendRepository;
    private final UserRepository userRepository;
    private final PhaseRepository phaseRepository;

    public NjzSendService(
            NjzSendRepository njzSendRepository,
            UserRepository userRepository,
            PhaseRepository phaseRepository
    ) {
        this.njzSendRepository = njzSendRepository;
        this.userRepository = userRepository;
        this.phaseRepository = phaseRepository;
    }

    public boolean levelUp(long userId, long crushId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<User> crushOptional = userRepository.findById(crushId);

        if (userOptional.isPresent() && crushOptional.isPresent()) {
            Optional<NjzSend> njzSend = njzSendRepository.getNjz(userOptional.get(), crushOptional.get());
            if (njzSend.isPresent()) {
                if (njzSend.get().getPhase().getLevel() == 1) {
                    Optional<Phase> phase = phaseRepository.findByLevel(2);
                    if (phase.isPresent()) {
                        njzSend.get().setPhase(phase.get());
                        njzSendRepository.save(njzSend.get());
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        return false;
    }

    public boolean isFriend(long userId, long crushId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<User> crushOptional = userRepository.findById(crushId);

        if (userOptional.isPresent() && crushOptional.isPresent()) {
            Optional<NjzSend> njzSend = njzSendRepository.getNjz(userOptional.get(), crushOptional.get());
            return njzSend.isPresent() && njzSend.get().getStatus().equalsIgnoreCase("accept");
        }
        return false;
    }

    public boolean addCrush(long userId, long crushId, String content) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return false;
        }
        Optional<User> crush = userRepository.findById(crushId);
        if (crush.isEmpty()) {
            return false;
        }

        NjzKey key = new NjzKey(userId, crushId);
        NjzSend njzSend = new NjzSend();
        njzSend.setNjzKey(key);
        njzSend.setCrush(crush.get());

        njzSend.setUser(user.get());
        njzSend.setSendDate(LocalDateTime.now());
        njzSend.setStatus("PENDING");
        njzSend.setContent(content);

        njzSendRepository.save(njzSend);
        return true;
    }

    public boolean acceptCrush(long userId, long crushId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return false;
        }

        Optional<User> crush = userRepository.findById(crushId);
        if (crush.isEmpty()) {
            return false;
        }

        Optional<NjzSend> njzSend = njzSendRepository.getNjz(user.get(), crush.get());

        if (njzSend.isEmpty()) {
            return false;
        }

        njzSend.get().setStatus("ACCEPT");
        Optional<Phase> phase = phaseRepository.findByLevel(1);
        phase.ifPresent(value -> njzSend.get().setPhase(value));
        njzSendRepository.save(njzSend.get());

        return true;
    }

    public boolean deleteCrush(long userId, long crushId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return false;
        }

        Optional<User> crush = userRepository.findById(crushId);
        if (crush.isEmpty()) {
            return false;
        }

        Optional<NjzSend> njzSend = njzSendRepository.getNjz(user.get(), crush.get());

        if (njzSend.isEmpty()) {
            return false;
        }

        njzSendRepository.delete(njzSend.get());

        return true;
    }

    public List<UserNjz> getNjzSend(long userId) {
        Optional<User> user = userRepository.findById(userId);
        List<UserNjz> userNjz = new ArrayList<>();
        if (user.isPresent()) {
            for (NjzSend njzSend : user.get().getNjzSends()) {
                if (!Objects.equals(njzSend.getStatus(), "PENDING")) {
                    continue;
                }
                UserNjz njz = new UserNjz();
                njz.setId(njzSend.getCrush().getId());
                njz.setAvatar(njzSend.getCrush().getAvatar());
                njz.setUsername(njzSend.getCrush().getUsername());
                njz.setFirstName(njzSend.getCrush().getFirstName());
                njz.setLastName(njzSend.getCrush().getLastName());
                njz.setSentDate(njzSend.getSendDate());
                njz.setContent(njzSend.getContent());
                userNjz.add(njz);
            }
            return userNjz;
        }
        return null;
    }

    public List<UserNjz> getNjzCome(long userId) {
        Optional<User> user = userRepository.findById(userId);
        List<UserNjz> userNjz = new ArrayList<>();
        if (user.isPresent()) {
            for (NjzSend njzSend : user.get().getNjzCrushes()) {
                if (!Objects.equals(njzSend.getStatus(), "PENDING")) {
                    continue;
                }
                UserNjz njz = new UserNjz();
                njz.setId(njzSend.getUser().getId());
                njz.setAvatar(njzSend.getUser().getAvatar());
                njz.setFirstName(njzSend.getUser().getFirstName());
                njz.setUsername(njzSend.getUser().getUsername());
                njz.setLastName(njzSend.getUser().getLastName());
                njz.setSentDate(njzSend.getSendDate());
                njz.setContent(njzSend.getContent());
                userNjz.add(njz);
            }
            return userNjz;
        }
        return null;
    }
}
