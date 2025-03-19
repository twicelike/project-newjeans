package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.HobbyTag;
import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.repository.HobbyTagRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void addHobby(String name) {
        HobbyTag hobbyTag = new HobbyTag();
        hobbyTag.setName(name);
        hobbyTagRepository.save(hobbyTag);
    }

    @Transactional
    public void addHobbyToUser(long userId, int[] hobbyIds) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            for (int hobbyId : hobbyIds) {
                Optional<HobbyTag> hobbyTag = hobbyTagRepository.findById(hobbyId);
                if (hobbyTag.isPresent()) {
                    user.get().getHobbyTags().add(hobbyTag.get());
                    hobbyTag.get().getUsers().add(user.get());
                }
            }
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

    public void addTestHobby() {
        HobbyTag hobbyTag = new HobbyTag();
        hobbyTag.setName("test1");

        HobbyTag hobbyTag2 = new HobbyTag();
        hobbyTag2.setName("test2");

        hobbyTagRepository.save(hobbyTag);
        hobbyTagRepository.save(hobbyTag2);

    }

    public void addTagToUser() {
        Optional<HobbyTag> hobbyTag = hobbyTagRepository.findById(1);
        Optional<User> user = userRepository.findByEmail("abc@gmail.com");
        Optional<User> user1 = userRepository.findByEmail("mhoanga1@gmail.com");
        if (hobbyTag.isPresent() && user.isPresent() && user1.isPresent()) {
            hobbyTag.get().getUsers().add(user.get());
            user.get().getHobbyTags().add(hobbyTag.get());

            hobbyTag.get().getUsers().add(user1.get());
            user1.get().getHobbyTags().add(hobbyTag.get());
        }
    }

    public void fetch() {
        Optional<User> user = userRepository.findByEmail("abc@gmail.com");
        if (user.isPresent()) {
            Set<HobbyTag> hobbyTags = user.get().getHobbyTags();
            for (HobbyTag tag : hobbyTags) {
                System.out.println(tag.getName());
            }
        }
    }
}
