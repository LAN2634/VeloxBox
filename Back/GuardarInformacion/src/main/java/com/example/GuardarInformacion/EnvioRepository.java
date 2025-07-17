package com.example.GuardarInformacion;

import java.util.Optional;

/**
 * Repositorio simple para Envio (sin JPA).
 * Define las operaciones necesarias para obtener o almacenar información de envío.
 */
public interface EnvioRepository {

    /**
     * Busca la información de envío asociada a un usuario.
     *
     * @param usuarioId ID del usuario
     * @return Optional con el objeto Envio si existe, vacío en caso contrario
     */
    Optional<Envio> findByUsuarioId(Long usuarioId);

    /**
     * Guarda o actualiza la información de envío.
     *
     * @param envio Objeto de envío a persistir
     * @return El mismo objeto enviado (o una copia actualizada)
     */
    Envio save(Envio envio);
}
