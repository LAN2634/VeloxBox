package com.Horizon.MCS;

import com.Horizon.MCS.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repositorio específico para la autenticación de administradores.
 */
public interface AdminAuthRepository extends JpaRepository<Administrador, Long> {
    /**
     * Busca administrador por usuario y contraseña.
     * Devuelve Optional.empty() si no coincide.
     */
    Optional<Administrador> findByUsuarioAndContrasena(String usuario, String contrasena);
}