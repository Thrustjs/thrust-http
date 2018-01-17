Http
===============

Http é um *bitcode* de servidor http, usado para responder requisições e servir arquivos estáticos em [ThrustJS](https://github.com/thrustjs/thrust)

## Tutorial

```javascript
let server = require("http")

server.createServer(8778)
```
O servidor HTTP irá subir na porta 8778.
Acesse a URL http://localhost:8778/ a partir de um browser e será renderizado o seguinte conteúdo:

```html
Thrust is running!!!
```
O modulo http contém os seguintes métodos

```javascript
/**
  * Função que inicia um servidor na porta informada e com o roteamento informados.
  Caso o router não seja passado, o server criará um default internamente.
  * @param {Number} port - porta em que o servidor será levantado
  * @param {thrust-bitcodes/router} [httpRouter=undefined] -router customizado com rotas de serviço
  */
createServer(port, httpRouter)
```

Para mais informações sobre o módulo de roteamento, acesse [thrust-bitcodes/router](https://github.com/thrust-bitcodes/router)
