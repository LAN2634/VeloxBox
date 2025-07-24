package com.Horizon.MCS;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioInfoRepository extends JpaRepository<UsuarioInfo, Long> {
    Optional<UsuarioInfo> findByUsername(String username);

}