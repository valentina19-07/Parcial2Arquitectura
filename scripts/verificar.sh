#!/usr/bin/env bash
check() {
  code=$(curl -s -o /dev/null -w '%{http_code}' $2)
  if [ $code = 200 ]; then echo OK $1 $2; else echo FALLA $1 $2 codigo=$code; fi
}

check ms-productos http://localhost:3001/api/productos
check ms-clientes http://localhost:8082/api/clientes
check ms-pedidos http://localhost:3003/api/pedidos
check mfe-productos http://localhost:4201/remoteEntry.json
check mfe-clientes http://localhost:4202/remoteEntry.json
check mfe-pedidos http://localhost:4203/remoteEntry.json
check host http://localhost:4200
