package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.NjzKey;
import hoangvacban.demo.project_newjeans.entity.NjzSend;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.NjzSendRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static hoangvacban.demo.project_newjeans.util.Constants.STATUS_PENDING;

@Service
public class NjzSendService {

    private final NjzSendRepository njzSendRepository;
    private final UserRepository userRepository;

    public NjzSendService(NjzSendRepository njzSendRepository, UserRepository userRepository) {
        this.njzSendRepository = njzSendRepository;
        this.userRepository = userRepository;
    }


    public void addCrush() {
        List<User> users = userRepository.findAll();
        for (long i = 5; i <= 12; i++) {
            Optional<User> user = userRepository.findById(i);
            user.ifPresent(users::add);
        }
        for (int i = 0; i <= 3; i++) {
            for (int j = i + 1; j <= 5; j++) {
                NjzSend njzSend = new NjzSend();
                njzSend.setUserId(users.get(i));
                njzSend.setCrushId(users.get(j));
                njzSend.setSendDate(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
                njzSend.setContent(i + " : " + j);
                njzSend.setStatus(STATUS_PENDING);
                njzSend.setNjzKey(new NjzKey(users.get(i).getId(), users.get(j).getId()));
                njzSendRepository.save(njzSend);
            }
        }
    }

    public void getCrushList() {
        Optional<User> user = userRepository.findById(1L);
        if (user.isPresent()) {
            Set<NjzSend> users = user.get().getNjzSends();
            users.forEach(u -> {
                System.out.println(u.getCrushId().getUsername());
            });
        }
    }
}
