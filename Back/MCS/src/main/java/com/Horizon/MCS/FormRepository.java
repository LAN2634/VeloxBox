package com.Horizon.MCS;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FormRepository extends JpaRepository<Formulario, Long> {
    List<Formulario> findByCategoria(String categoria);


}