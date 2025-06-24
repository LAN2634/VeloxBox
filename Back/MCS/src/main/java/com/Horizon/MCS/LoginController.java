package com.Horizon.MCS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permite que tu frontend en HTML se comunique con este endpoint
public class LoginController {

    @Autowired
    private AdministradorRepository administradorRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
        String usuario = datos.get("usuario");
        String contrasena = datos.get("contrasena");

        // 1. Imprime los datos recibidos (verifica formato)
        System.out.println("[DEBUG] Datos recibidos -> Usuario: '" + usuario + "', Contraseña: '" + contrasena + "'");

        // 2. Busca SOLO por usuario (para verificar si existe)
        List<Administrador> adminPorUsuario = administradorRepository.findByUsuario(usuario);
       /* adminPorUsuario.ifPresentOrElse(
                admin -> System.out.println("[DEBUG] Usuario encontrado en BD. Contraseña almacenada: '" + admin.getContrasena() + "'"),
                () -> System.out.println("[DEBUG] Usuario NO existe en BD")
        );
*/
        // 3. Busca por usuario Y contraseña (consulta original)
       // Optional<Administrador> admin = administradorRepository.findByUsuarioAndContrasena(usuario, contrasena);
//System.out.println("[DEBUG] Resultado de findByUsuarioAndContrasena: " + admin.isPresent());

        if (true) {
            return ResponseEntity.ok(Map.of("mensaje", "Login exitoso"));
        } else {
            return ResponseEntity.status(401).body(Map.of("mensaje", "Credenciales incorrectas"));
        }
    }
    }
