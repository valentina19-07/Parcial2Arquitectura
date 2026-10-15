package com.parcial.clientes.domain.repository;

import com.parcial.clientes.domain.model.Cliente;
import java.util.List;
import java.util.Optional;

public interface ClienteRepository {
    List<Cliente> findAll();
    Optional<Cliente> findById(Long id);
    Cliente save(Cliente cliente);
}
