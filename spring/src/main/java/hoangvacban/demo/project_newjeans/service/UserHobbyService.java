package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.UserHobby;
import hoangvacban.demo.project_newjeans.repository.UserHobbyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserHobbyService {

    private final UserHobbyRepository userHobbyRepository;

    public UserHobbyService(UserHobbyRepository userHobbyRepository) {
        this.userHobbyRepository = userHobbyRepository;
    }

    public void deleteUserHobby(UserHobby userHobby) {
        if (userHobbyRepository.existsById(userHobby.getId())) {
            userHobbyRepository.deleteById(userHobby.getId());
        }
    }

    public List<UserHobby> getAllUserHobbiesByHobbyId(int hobbyId) {
        return userHobbyRepository.findAllByHobbyTagId(hobbyId);
    }
}
