package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.Role;
import hoangvacban.demo.project_newjeans.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }
}
