package com.Horizon.MCS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuario/info")
public class UsuarioInfoController {

    @Autowired
    private UsuarioInfoRepository infoRepo;

    /**
     * GET  /usuario/info
     * Devuelve el primer registro si existe, o 204 No Content si no hay ninguno aún.
     */
    @GetMapping("/{username}")
    public ResponseEntity<UsuarioInfo> getInfo(@PathVariable String username) {
        return infoRepo.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping
    public ResponseEntity<UsuarioInfo> createInfo(@RequestBody UsuarioInfo info) {
        if (infoRepo.findByUsername(info.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        UsuarioInfo saved = infoRepo.save(info);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }


    /**
     * PUT /usuario/info
     * Actualiza un registro existente. El JSON debe incluir el campo id.
     */
    @PutMapping
    public ResponseEntity<UsuarioInfo> updateInfo(@RequestBody UsuarioInfo info) {
        if (info.getId() == null || !infoRepo.existsById(info.getId())) {
            return ResponseEntity.notFound().build();
        }
        UsuarioInfo updated = infoRepo.save(info);
        return ResponseEntity.ok(updated);
    }
}
