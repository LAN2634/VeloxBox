package com.Horizon.MCS;

import com.Horizon.MCS.Administrador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
        import org.springframework.web.bind.annotation.*;

        import java.util.Map;

/**
 * Controlador de login para administradores,
 * expone POST /admin/login
 */
@RestController
@RequestMapping("/admin")

public class AdminAuthController {

    @Autowired
    private AdminAuthRepository adminAuthRepo;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> datos) {
        String user = datos.get("usuario");
        String pass = datos.get("contrasena");

        return adminAuthRepo
                .findByUsuarioAndContrasena(user, pass)
                .map(admin -> {
                    // ✅ Generar el token JWT con el nombre de usuario
                    String token = JwtUtil.generateToken(admin.getUsuario());

                    return ResponseEntity.ok(Map.of(
                            "username", admin.getUsuario(),
                            "mensaje", "Login de administrador exitoso",
                            "token", token
                    ));
                })
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("mensaje", "Credenciales incorrectas")));
    }
}