package com.Horizon.MCS;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioInfoRepository extends JpaRepository<UsuarioInfo, Long> {
    // No hace falta nada más: JpaRepository ya te da findAll(), save(), existsById(), etc.
}