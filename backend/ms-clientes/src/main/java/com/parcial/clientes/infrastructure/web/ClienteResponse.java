package com.parcial.clientes.infrastructure.web;

import com.parcial.clientes.domain.model.Cliente;

public record ClienteResponse(Long id, String nombre, String email, String ciudad) {
    public static ClienteResponse from(Cliente c) {
        return new ClienteResponse(c.getId(), c.getNombre(), c.getEmail(), c.getCiudad());
    }
}
