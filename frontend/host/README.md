# host

Aplicación contenedora (Angular 17). Muestra un navbar y carga en tiempo de ejecución los tres microfrontends.

- Puerto: **4200**
- Remotos configurados en `src/assets/federation.manifest.json`

| Ruta | Microfrontend | Remoto |
|---|---|---|
| /productos | mfe-productos | http://localhost:4201/remoteEntry.json |
| /clientes | mfe-clientes | http://localhost:4202/remoteEntry.json |
| /pedidos | mfe-pedidos | http://localhost:4203/remoteEntry.json |

## Ejecución

    npm install
    npm start

Levante primero los microfrontends y los microservicios.
