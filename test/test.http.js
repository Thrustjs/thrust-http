var majesty = require('majesty')
let httpClient = require('http-client')

function exec(describe, it, beforeEach, afterEach, expect, should, assert) {
  var rs
  // afterEach(function() { })
  // beforeEach(function() { })

  describe('Servidor WEB para thrust', function() {
    describe('Servindo arquivos estáticos diretório padrão [/static]', function() {
      it('Arquivos tipo [.html]', function() {
        rs = httpClient.get('http://localhost:8778/static/index.html')
          .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body).to.be.a('string')
        expect(rs.body.replace(/\n|\r/g, '').replace(/\s\s/g, ' ').length).to.equal(200)
      })
    })
    describe('Acessando APIs com método [GET]', function() {
      it('Retornando um objeto JSON', function() {
        rs = httpClient.get('http://localhost:8778/app/teste/echo')
          .params({ nome: 'thrust', nota: 10 })
          .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body.nome).to.equal('thrust')
        expect(rs.body.nota).to.equal(10)
        expect(rs.body.server).to.equal(true)
        expect(rs.headers['Content-Type']).contains('application/json')
      })
    })

    /*
        describe('Acessando APIs com método [GET]', function() {
          it('Executando método GET retornando um objeto json', function() {
            rs = httpClient.get('https://jsonplaceholder.typicode.com/posts/1')
              .charset('UTF-8')
              .fetch()

            expect(rs.code).to.equal(200)
            expect(rs.body.id).to.equal(1)
          })

          it('Método GET utilizando [.headers]', function() {

            rs = httpClient.get('https://postman-echo.com/headers')
              .headers({
                'app': 'thrust',
                'user-agent': 'thrustBot-http-client/1.3.0',
                'Content-Type': 'application/json; charset=UTF-8'
              })
              .fetch()

            expect(rs.code).to.equal(200)
            expect(rs.body).to.not.equal(undefined)
            expect(rs.body.headers).to.not.equal(undefined)
            expect(rs.body.headers.app).to.equal('thrust')
          })

          it('Executando método POST inserindo um objeto json', function() {
            var di = new Date().getTime()

            rs = httpClient.post('https://reqres.in/api/users')
              .property('user-agent', 'thrustBot-http-client/1.3.0')
              .contentType('application/json')
              .params({
                'name': 'thrust',
                'job': 'platform'
              })
              .fetch()

            var df = new Date().getTime()

            expect(rs.code).to.equal(201)
            expect(rs.body).to.have.own.property('id')
            expect(rs.body.id).to.not.equal(undefined)
            expect(rs.body).to.include({ 'name': 'thrust', 'job': 'platform' })

            print('\tTempo de execução:', (df - di), 'ms.')
          })

          it('Executando método POST (site 2) inserindo um objeto json', function() {
            rs = httpClient.post('https://jsonplaceholder.typicode.com/posts')
              .property('user-agent', 'thrustBot-http-client/1.3.0')
              .contentType('application/json; charset=UTF-8')
              .params({
                'title': 'foo',
                'body': 'bar',
                'userId': 1
              })
              .fetch()

            expect(rs.code).to.equal(201)
            expect(rs.body).to.have.own.property('id')
            expect(rs.body).to.have.own.property('userId')
            expect(rs.body.id).to.not.equal(undefined)
            expect(rs.body).to.include({ 'title': 'foo', 'body': 'bar' })
          })

          it('Método POST utilizando [.headers]', function() {
            rs = httpClient.post('https://jsonplaceholder.typicode.com/posts')
              .headers({
                'origin': 'chrome-extension://aejoelaoggembcahagimdiliamlcdmfm',
                // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                'user-agent': 'thrustBot-http-client/1.3.0',
                'Content-Type': 'application/json; charset=UTF-8'
              })
              .params({
                'title': 'foo',
                'body': 'bar',
                'userId': 1
              })
              .fetch()

            expect(rs.code).to.equal(201)
            expect(rs.body).to.have.own.property('id')
            expect(rs.body).to.have.own.property('userId')
            expect(rs.body.id).to.not.equal(undefined)
            expect(rs.body).to.include({ 'title': 'foo', 'body': 'bar' })
          })
        })
    */
  })
}

var res = majesty.run(exec)

print('', res.success.length, ' scenarios executed with success and')
print('', res.failure.length, ' scenarios executed with failure.\n')

res.failure.forEach(function(fail) {
  print('[' + fail.scenario + '] =>', fail.execption)
  var i = 0
  if (fail.execption.printStackTrace && i === 0) {
    // fail.execption.printStackTrace()
    i++
  }
})

// java.lang.Runtime.getRuntime().exec("cmd /k chcp 65001");
