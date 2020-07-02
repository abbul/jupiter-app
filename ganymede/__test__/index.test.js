const request = require('supertest')
const app = require('../build/app.js')
const req = request(app)

describe('IndexController', () => {
  test('welcome', done => {
    req.get('/')
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('welcome')
        done()
      })
  })
})
