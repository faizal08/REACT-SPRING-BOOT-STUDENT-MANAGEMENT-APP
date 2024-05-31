package com.reactspringproject.backend.Dao;

import com.reactspringproject.backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long>
{
     Role findByRoleName(String roleName);
}
