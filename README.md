Http
===============

Http é um *bitcode* de servidor http, usado para responder requisições e servir arquivos estáticos em [ThrustJS](https://github.com/thrustjs/thrust)

## Tutorial

```javascript
let server = require("http")

server.createServer(8778, null /*router*/, {
  "staticFilesPath": /*String (Default: /static)*/,
  "maxPostSize": /*Inteiro (Default: 2MB)*/,
  "compression": /*Boolean (Default: true)*/,
  "compressionMinSize": /*Inteiro em bytes (Default: 1024)*/,
  "compressableMimeType": /*Inteiro (Default: "text/html,text/xml,text/css,application/json,application/javascript")*/,
  "servlets": {
    httpProxy: { /*String nome único do servlet (Default: false)*/,
      plainJava: /*Boolean define se o servlet recebera o request/response como java (Default: false)*/,
      service: /*Function implementação do servlet*/,
      paths: /*Array<String> paths em que o servlet responderá*/
    }
  }
})
```
O servidor HTTP irá subir na porta 8778.
Acesse a URL http://localhost:8778/ a partir de um browser e será renderizado o seguinte conteúdo:

```html
Thrust is running!!!
```

## API

```javascript
/**
  * Função que inicia um servidor na porta informada e com o roteamento informados.
  Caso o router não seja passado, o server criará um default internamente.
  * @param {Number} port - porta em que o servidor será levantado
  * @param {thrust-bitcodes/router} [httpRouter=undefined] -router customizado com rotas de serviço
  */
createServer(port, httpRouter)
```

## Parâmetros de configuração
As propriedades abaixo devem ser configuradas no arquivo *config.json* (distribuído juntamente com o ThrustJS):

``` javascript
{
  ...
  "http": { /*Configuração do http*/
    "staticFilesPath": /*String (Default: static)*/,
    "maxPostSize": /*Inteiro (Default: 2MB)*/,
    "compression": /*Boolean (Default: true)*/,
    "compressionMinSize": /*Inteiro em bytes (Default: 1024)*/,
    "compressableMimeType": /*Inteiro (Default: "text/html,text/xml,text/css,application/json,application/javascript")*/,
  }
}

```

Para mais informações sobre o módulo de roteamento, acesse [thrust-bitcodes/router](https://github.com/thrust-bitcodes/router)


## What's new

v0.3.0 - Melhoria: Adicionando possibilidade de adicionar servlets customizados ao thrust 

v0.2.2 - Melhoria: Adicionando opções referentes a compressão GZIP das requisições:
* Agora, por padrão o http irá realizar a compressão GZIP dos dados retornados, também é possível alterar os padrões, via options ou config.json, vide parâmetros acima. 

v0.2.1 - Melhoria: Adicionando opção maxPostSize para o servidor
* Por padrão o servidor tem um limite de tamanho do post de 2MB, foi criada a opção maxPostSize para que seja possível alterar este valor padrão

v0.2.0 - Fix: corrigindo a _decodificação_ quando um JSON é passado no _body_ do POST ou PUT
* Foi corrigido o método [mountRequest] para não decodificar o conteúdo do body quando o mesmo for um JSON

v0.1.9 - Fix/Melhoria: _createServer_ adicionando o parâmetro _options_ e correção do _parseParams_
* adicionando o parâmetro _options_ no método _createServer_ possibilitando especificar o path para arquivos estáticos através do atributo _staticFilesPath_ e outras opções no futuro.
* corrigindo o método _parseParams_ que retornava um numérico quando uma string começava com números.
* criação da suite test case do bitcode

v0.1.8 - Alterando declarações com let para var para evitar problemas com a evaluação no nashorn

v0.1.7 - Adicionando suporte a multpart-form-data

v0.1.6 - Removendo variavel não utilizada, cuja atribuição causava problemas no charset do response

v0.1.4 - Removendo variavel writer não utilizada, que causava problemas no charset do response, entre outros

v0.1.3 - Corrigindo problema com o response.error.json

v0.1.x - Correções e melhorias
* Atualização do README e documentação
* Adicionando get de cookies no request
* Ajustando o http para que o servidor possa ser levantado em um diretório diferente do diretório corrente do terminal
* etc
