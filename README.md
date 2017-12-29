# thrust-http
Modulo http do thrust que inclui servidor http e http client

## Example HTTP Server

Crie um arquivo, por exemplo *server.js*, e copie o código abaixo:
```javascript
var server = require("./http").server
var router = require("./httpRouter")

print("Hello Server!!")

server.createServer(3000, router)
```

Vá na console e execute o thrust:
```shell
java -jar thrust.jar server.js
```
O servidor HTTP irá subir na porta 3000.
Chame a URL http://localhost:3000/ a partir de um browser e será renderizado o seguinte conteúdo:
```html
    <H2>Thrust is running!!!</H2>
```

## Example HTTP Client
```javascript
print ("\n",
    HTTPClient
        // .post("http://localhost:8080/test/pecho", {params: {nome: "P Paulo", idade: 13}})
        .post("http://localhost:8080/test/pecho")
        .params({params: {nome: "David", idade: 10}})
        // .get("http://example.com")
        // .get("http://localhost:8080/test/json")
        // .get("http://localhost:8080/test/echo", {params: {nome: "P Paulo", idade: 13}})
        // .get("http://localhost:8080/test/echo")
        // .params({params: {nome: "P Paulo", idade: 13}})
        .charset("UTF-8")
        .fetch()
    , "\n"
)
```