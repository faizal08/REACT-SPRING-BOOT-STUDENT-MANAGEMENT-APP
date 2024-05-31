package com.reactspringproject.backend.Service.Impl;

import com.reactspringproject.backend.Dao.RoleRepository;
import com.reactspringproject.backend.Entity.Role;
import com.reactspringproject.backend.Service.RoleService;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class RoleServiceImpl implements RoleService
{
    private static final Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    private RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getRole() {
        logger.info("Attempting to retrieve role with name 'User'");
        Role role = roleRepository.findByRoleName("User");
        logger.info("Retrieved role: {}", role);
        return role;
    }
}
