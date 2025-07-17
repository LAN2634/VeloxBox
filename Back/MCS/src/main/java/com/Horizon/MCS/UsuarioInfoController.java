package com.Horizon.MCS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuario/info")
@CrossOrigin(origins = "*")
public class UsuarioInfoController {

    @Autowired
    private UsuarioInfoRepository infoRepo;

    /**
     * GET  /usuario/info
     * Devuelve el primer registro si existe, o 204 No Content si no hay ninguno aún.
     */
    @GetMapping
    public ResponseEntity<UsuarioInfo> getInfo() {
        Optional<UsuarioInfo> opt = infoRepo.findAll().stream().findFirst();
        return opt
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * POST /usuario/info
     * Crea un nuevo registro con los datos del JSON.
     */
    @PostMapping
    public ResponseEntity<UsuarioInfo> createInfo(@RequestBody UsuarioInfo info) {
        UsuarioInfo saved = infoRepo.save(info);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
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
