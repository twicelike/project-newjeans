package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.repository.NjzSendRepository;
import org.springframework.stereotype.Service;

@Service
public class NjzSendService {

    private final NjzSendRepository njzSendRepository;

    public NjzSendService(NjzSendRepository njzSendRepository) {
        this.njzSendRepository = njzSendRepository;
    }

}
