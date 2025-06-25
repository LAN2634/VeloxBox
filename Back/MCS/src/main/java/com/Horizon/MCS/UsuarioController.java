package com.Horizon.MCS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Registro de usuario
    @PostMapping("/registrar")
    public ResponseEntity<Map<String, String>> registrarUsuario(@RequestBody Usuario usuario) {

        Map<String, String> response = new HashMap<>();

        String username = usuario.getUsername();
        String email = usuario.getEmail();
        String password = usuario.getPasswordHash(); // recibido en texto plano

        if (email == null || !email.contains("@")) {
            response.put("error", "Email no válido");
            return ResponseEntity.badRequest().body(response);
        }

        if (usuarioRepository.findByEmail(email).isPresent()) {
            response.put("error", "El correo ya está registrado");
            return ResponseEntity.badRequest().body(response);
        }

        if (usuarioRepository.findByUsername(username).isPresent()) {
            response.put("error", "El nombre de usuario ya está en uso");
            return ResponseEntity.badRequest().body(response);
        }

        // Para pruebas, guardamos contraseña sin hash
        usuario.setPasswordHash(password);

        usuarioRepository.save(usuario);

        response.put("mensaje", "Usuario registrado con éxito");
        response.put("username", username);
        return ResponseEntity.ok().body(response);
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);

        if (usuarioOptional.isEmpty() ||
                !usuarioOptional.get().getPasswordHash().equals(password)) {
            return ResponseEntity.status(401).body("Correo o contraseña incorrectos.");
        }

        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Inicio de sesión exitoso");
        response.put("username", usuarioOptional.get().getUsername());

        return ResponseEntity.ok(response);
    }
}
