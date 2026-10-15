package com.parcial.clientes.infrastructure.config;

import com.parcial.clientes.application.usecase.CrearClienteUseCase;
import com.parcial.clientes.application.usecase.ListarClientesUseCase;
import com.parcial.clientes.application.usecase.ObtenerClienteUseCase;
import com.parcial.clientes.domain.repository.ClienteRepository;
import com.parcial.clientes.infrastructure.persistence.InMemoryClienteRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public ClienteRepository clienteRepository() {
        return new InMemoryClienteRepository();
    }

    @Bean
    public ListarClientesUseCase listarClientesUseCase(ClienteRepository repository) {
        return new ListarClientesUseCase(repository);
    }

    @Bean
    public ObtenerClienteUseCase obtenerClienteUseCase(ClienteRepository repository) {
        return new ObtenerClienteUseCase(repository);
    }

    @Bean
    public CrearClienteUseCase crearClienteUseCase(ClienteRepository repository) {
        return new CrearClienteUseCase(repository);
    }
}
