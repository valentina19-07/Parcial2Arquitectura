package com.parcial.clientes.application.usecase;

import com.parcial.clientes.domain.model.Cliente;
import com.parcial.clientes.domain.repository.ClienteRepository;
import java.util.List;

public class ListarClientesUseCase {
    private final ClienteRepository repository;

    public ListarClientesUseCase(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> execute() {
        return repository.findAll();
    }
}
