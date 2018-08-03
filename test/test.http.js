var majesty = require('majesty')
let httpClient = require('http-client')

function exec(describe, it, beforeEach, afterEach, expect, should, assert) {
  var rs
  // afterEach(function() { })
  // beforeEach(function() { })

  describe('Servidor WEB para thrust', function () {
    describe('Servindo arquivos estáticos diretório padrão [/static]', function () {
      it('Arquivos tipo [.html]', function () {
        rs = httpClient.get('http://localhost:8778/static/index.html')
          .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body).to.be.a('string')
        expect(rs.body.replace(/\n|\r/g, '').replace(/\s\s/g, ' ').length).to.equal(200)
      })
    })

    describe('Acessando APIs com método [POST]', function () {
      it('Retornando um objeto JSON', function () {
        rs = httpClient.post('http://localhost:8778/app/teste/echo')
          .params({ nome: 'thrust', nota: 10 })
          .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body.nome).to.equal('thrust')
        expect(rs.body.nota).to.equal(10)
        expect(rs.headers['Content-Type']).contains('application/json')
      })
    })

    describe('Acessando APIs com método [GET]', function () {
      it('Retornando um objeto JSON', function () {
        rs = httpClient.get('http://localhost:8778/app/teste/params?id=557897')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body.id).to.a('number')
        expect(rs.body.id).to.equal(557897)
      })

      it('Acessando um customServlet', function () {
        rs = httpClient.get('http://localhost:8778/customServlet')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body).to.a('string')
        expect(rs.body).to.equal('customServlet')
      })
    })

    describe('Validando propriedades dos objetos da requisição', function () {
      it('Validando propriedades do request', function () {
        rs = httpClient.get('http://localhost:8778/app/teste/requestProperties?teste=1')
          .params({ nome: 'thrust', nota: 10 })
          .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body).to.nested.include({
          "rest": "/app/teste/requestProperties",
          "queryString": "teste=1?nome=thrust&nota=10",
          "contentType": "application/x-www-form-urlencoded",
          "method": "GET",
          "requestURI": "/app/teste/requestProperties",
          "pathInfo": "/app/teste/requestProperties",
          "scheme": "http",
          "host": "localhost",
          "port": 8778,
          "contextPath": "",
          "servletPath": ""
        })
      });

      it('Validando propriedades do response', function () {
        rs = httpClient.get('http://localhost:8778/app/teste/responseProperties?teste=1')
          .params({ nome: 'thrust', nota: 10 })
          .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body).to.nested.include({
          "status": 200,
          "contentLength": 0,
          "contentType": "text/html",
          "charset": "UTF-8"
        });
      });
    })
  })
}

var res = majesty.run(exec)

print('', res.success.length, ' scenarios executed with success and')
print('', res.failure.length, ' scenarios executed with failure.\n')

res.failure.forEach(function (fail) {
  print('[' + fail.scenario + '] =>', fail.execption)
})

// java.lang.Runtime.getRuntime().exec("cmd /k chcp 65001");
