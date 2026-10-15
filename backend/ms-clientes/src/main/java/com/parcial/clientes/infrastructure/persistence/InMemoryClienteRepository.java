package com.parcial.clientes.infrastructure.persistence;

import com.parcial.clientes.domain.model.Cliente;
import com.parcial.clientes.domain.repository.ClienteRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

public class InMemoryClienteRepository implements ClienteRepository {
    private final List<Cliente> items = new ArrayList<>();
    private final AtomicLong sequence = new AtomicLong(0);

    public InMemoryClienteRepository() {
        save(new Cliente(null, "Ana Gómez", "ana@correo.com", "Cali"));
        save(new Cliente(null, "Luis Pérez", "luis@correo.com", "Bogotá"));
        save(new Cliente(null, "María Ruiz", "maria@correo.com", "Medellín"));
    }

    @Override
    public synchronized List<Cliente> findAll() {
        return new ArrayList<>(items);
    }

    @Override
    public synchronized Optional<Cliente> findById(Long id) {
        return items.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    @Override
    public synchronized Cliente save(Cliente cliente) {
        Cliente nuevo = new Cliente(sequence.incrementAndGet(), cliente.getNombre(),
                cliente.getEmail(), cliente.getCiudad());
        items.add(nuevo);
        return nuevo;
    }
}
