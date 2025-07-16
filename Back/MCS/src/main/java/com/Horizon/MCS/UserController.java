package com.Horizon.MCS;

import com.Horizon.MCS.LoginRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

        import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/loginu")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (usuario != null && passwordEncoder.matches(loginRequest.getPassword(), usuario.getPasswordHash())) {
            String token = JwtUtil.generateToken(usuario.getUsername());

            Map<String, Object> datos = new HashMap<>();
            datos.put("username", usuario.getUsername());
            datos.put("token", token);

            return ResponseEntity.ok(datos);
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

}
