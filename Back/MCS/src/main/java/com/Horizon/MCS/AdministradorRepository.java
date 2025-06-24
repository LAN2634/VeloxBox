package com.Horizon.MCS;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

        // Versión mejorada de la consulta (insensible a mayúsculas y espacios)
        //@Query("SELECT a FROM Administrador a WHERE (a.usuario) = (:usuario) AND (a.contrasena) = (:contrasena)")
        @Query("SELECT a FROM Administrador a WHERE (a.usuario) = (:usuario)")
       // Optional<Administrador> findByUsuarioAndContrasena(@Param("usuario") String usuario, @Param("contrasena") String contrasena);

        // Consulta adicional para depuración (busca solo por usuario)
        List<Administrador> findByUsuario(String usuario);

}
