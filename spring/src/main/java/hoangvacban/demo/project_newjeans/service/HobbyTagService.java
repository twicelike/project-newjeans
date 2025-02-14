package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.HobbyTag;
import hoangvacban.demo.project_newjeans.domain.UserHobby;
import hoangvacban.demo.project_newjeans.repository.HobbyTagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HobbyTagService {

    private final HobbyTagRepository hobbyTagRepository;
    private final UserHobbyService userHobbyService;

    public HobbyTagService(HobbyTagRepository hobbyTagRepository, UserHobbyService userHobbyService) {
        this.hobbyTagRepository = hobbyTagRepository;
        this.userHobbyService = userHobbyService;
    }

    public void addHobby(String name) {
        HobbyTag hobbyTag = new HobbyTag();
        hobbyTag.setName(name);
        hobbyTagRepository.save(hobbyTag);
    }

    public void removeHobby(int id) {
        Optional<HobbyTag> hobbyTag = hobbyTagRepository.findById(id);

        if (hobbyTag.isPresent()) {
            List<UserHobby> userHobbies = userHobbyService.getAllUserHobbiesByHobbyId(id);
            for (UserHobby userHobby : userHobbies) {
                userHobbyService.deleteUserHobby(userHobby);
            }
            hobbyTagRepository.deleteById(id);
        }
    }
}
