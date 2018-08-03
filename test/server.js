var server = require('../index')
var router = require('router')

server.createServer(8778, router, {
    servlets: {
        customServlet: {
            service: function (request, response) {
                response.setStatus(200)
                response.setContentType('text/html; charset=utf-8')

                response.getWriter().println('customServlet')
                response.flushBuffer()
            },
            paths: ['/customServlet']
        }
    }
})
