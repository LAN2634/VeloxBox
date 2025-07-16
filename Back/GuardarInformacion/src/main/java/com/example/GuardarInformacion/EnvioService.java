package com.example.GuardarInformacion;

import java.util.Optional;

public interface EnvioService {
    Optional<Envio> getByUsuarioId(Long usuarioId);
    Envio save(Envio envio);
}
