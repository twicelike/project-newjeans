package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.HobbyTag;
import hoangvacban.demo.project_newjeans.repository.HobbyTagRepository;
import org.springframework.stereotype.Service;

@Service
public class HobbyTagService {

    private final HobbyTagRepository hobbyTagRepository;

    public HobbyTagService(HobbyTagRepository hobbyTagRepository) {
        this.hobbyTagRepository = hobbyTagRepository;
    }

    public void addHobby(String name) {
        HobbyTag hobbyTag = new HobbyTag();
        hobbyTag.setName(name);
        hobbyTagRepository.save(hobbyTag);
    }
}
