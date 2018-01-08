# thrust-http
Modulo http do thrust que inclui servidor http e http client

## Example HTTP Server

Crie um arquivo, por exemplo *server.js*, e copie o código abaixo:
```javascript
var server = require("http")
var router = require("router")

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
Thrust is running!!!
```
