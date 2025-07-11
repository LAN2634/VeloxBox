package com.Horizon.AnadirProductos;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findById(Long id);
    Optional<Producto> findBySku(String sku);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM Producto p WHERE p.username = :username")
    void deleteByUsername(@Param("username") String username);
    Optional<Producto> findBySkuAndUsername(String sku, String username);


}
