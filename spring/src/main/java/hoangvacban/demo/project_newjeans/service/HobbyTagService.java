package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.HobbyTagDTO;
import hoangvacban.demo.project_newjeans.entity.HobbyTag;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.HobbyTagRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HobbyTagService {

    private final HobbyTagRepository hobbyTagRepository;
    private final UserRepository userRepository;

    public HobbyTagService(HobbyTagRepository hobbyTagRepository, UserRepository userRepository) {
        this.hobbyTagRepository = hobbyTagRepository;
        this.userRepository = userRepository;
    }

    public void addHobby(HobbyTagDTO tag) {
        HobbyTag hobbyTag = new HobbyTag();
        hobbyTag.setName(tag.getName());
        hobbyTag.setEmoji(tag.getEmoji());
        hobbyTagRepository.save(hobbyTag);
    }

    public List<HobbyTag> getAll() {
        return hobbyTagRepository.findAll();
    }

    @Transactional
    public void addHobbyToUser(User user, int[] hobbyIds) {
        user.getHobbyTags().clear();
        for (int hobbyId : hobbyIds) {
            hobbyTagRepository.findById(hobbyId).ifPresent(user::addHobbyTag);
        }
    }

    @Transactional
    public void removeHobby(int hobbyId) {
        Optional<HobbyTag> hobbyTag = hobbyTagRepository.findById(hobbyId);
        if (hobbyTag.isPresent()) {
            Set<User> users = hobbyTag.get().getUsers();
            for (User user : users) {
                user.getHobbyTags().remove(hobbyTag.get());
            }
            hobbyTagRepository.delete(hobbyTag.get());
        }
    }
}
