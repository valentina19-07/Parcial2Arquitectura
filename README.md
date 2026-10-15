# Parcial II - Arquitectura de Software

Microfrontends (Angular + federation) integrados por un host, cada uno conectado a su propio microservicio (Node.js / Spring Boot). Todos aplican Clean Architecture.

Integrantes: Valentina Gonzalez Mejia y Juan Fernando Vargas.

## Qué microservicio consume cada microfrontend

| Microfrontend | Puerto | Microservicio | Tecnología | Puerto | URL consumida |
|---|---|---|---|---|---|
| mfe-productos | 4201 | ms-productos | Node.js | 3001 | http://localhost:3001/api/productos |
| mfe-clientes | 4202 | ms-clientes | Spring Boot | 8082 | http://localhost:8082/api/clientes |
| mfe-pedidos | 4203 | ms-pedidos | Node.js | 3003 | http://localhost:3003/api/pedidos |

El host (puerto 4200) carga los tres microfrontends con un navbar de navegación.
