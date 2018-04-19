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

    describe('Acessando APIs com método [GET]', function() {
      it('Retornando um objeto JSON', function() {
        rs = httpClient.get('http://localhost:8778/app/teste/params?id=557897')
          // .charset('UTF-8')
          .fetch()

        expect(rs.code).to.equal(200)
        expect(rs.body.id).to.a('number')
        expect(rs.body.id).to.equal(557897)
        // expect(rs.body.nota).to.equal(10)
        // expect(rs.body.server).to.equal(true)
        // expect(rs.headers['Content-Type']).contains('application/json')
      })
    })
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
