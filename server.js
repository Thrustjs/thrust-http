var server = require("./http").server
var router = require("./httpRouter")

print("Hello Server!!")

server.createServer(3000, router)
