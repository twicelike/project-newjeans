package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.UserNjz;
import hoangvacban.demo.project_newjeans.entity.NjzKey;
import hoangvacban.demo.project_newjeans.entity.NjzSend;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.NjzSendRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NjzSendService {

    private final NjzSendRepository njzSendRepository;
    private final UserRepository userRepository;

    public NjzSendService(NjzSendRepository njzSendRepository, UserRepository userRepository) {
        this.njzSendRepository = njzSendRepository;
        this.userRepository = userRepository;
    }


    public boolean addCrush(long userId, long crushId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return false;
        }
        Optional<User> crush = userRepository.findById(crushId);
        if (crush.isEmpty()) {
            return false;
        }

        if (njzSendRepository.existsNjz(user.get(), crush.get())) {
            return false;
        }

        NjzKey key = new NjzKey(userId, crushId);
        NjzSend njzSend = new NjzSend();
        njzSend.setNjzKey(key);
        njzSend.setCrush(crush.get());


        njzSend.setUser(user.get());
        njzSend.setSendDate(LocalDateTime.now());
        njzSend.setStatus("PENDING");
        njzSend.setContent("Hi! I'm " + user.get().getFirstName() + " " + user.get().getLastName() + ", let's get down");

        njzSendRepository.save(njzSend);
        return true;
    }

    public List<UserNjz> getNjzSend(long userId) {
        Optional<User> user = userRepository.findById(userId);
        List<UserNjz> userNjz = new ArrayList<>();
        if (user.isPresent()) {
            for (NjzSend njzSend : user.get().getNjzCrushes()) {
                UserNjz njz = new UserNjz();
                njz.setAvatar(njzSend.getCrush().getAvatar());
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
            for (NjzSend njzSend : user.get().getNjzSends()) {
                UserNjz njz = new UserNjz();
                njz.setAvatar(njzSend.getUser().getAvatar());
                njz.setFirstName(njzSend.getUser().getFirstName());
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
