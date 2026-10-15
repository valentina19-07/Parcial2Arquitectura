package com.parcial.clientes.application.usecase;

import com.parcial.clientes.domain.exception.ClienteNotFoundException;
import com.parcial.clientes.domain.model.Cliente;
import com.parcial.clientes.domain.repository.ClienteRepository;

public class ObtenerClienteUseCase {
    private final ClienteRepository repository;

    public ObtenerClienteUseCase(ClienteRepository repository) {
        this.repository = repository;
    }

    public Cliente execute(Long id) {
        return repository.findById(id).orElseThrow(() -> new ClienteNotFoundException(id));
    }
}
