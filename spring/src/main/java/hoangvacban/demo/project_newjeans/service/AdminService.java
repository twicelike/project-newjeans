package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.AdminDTO;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserService userService;

    public AdminService(UserService userService) {
        this.userService = userService;
    }

    public void login(AdminDTO adminDTO) {

    }
}
