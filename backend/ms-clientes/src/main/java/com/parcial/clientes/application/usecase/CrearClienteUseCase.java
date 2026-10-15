package com.parcial.clientes.application.usecase;

import com.parcial.clientes.domain.model.Cliente;
import com.parcial.clientes.domain.repository.ClienteRepository;

public class CrearClienteUseCase {
    private final ClienteRepository repository;

    public CrearClienteUseCase(ClienteRepository repository) {
        this.repository = repository;
    }

    public Cliente execute(String nombre, String email, String ciudad) {
        return repository.save(new Cliente(null, nombre, email, ciudad));
    }
}
