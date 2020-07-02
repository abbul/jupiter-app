import supertest from 'supertest'
import app from '../src/app'
const request = supertest(app)

describe('IndexController', () => {
  test('welcome', done => {
    request.get('/')
      .then((resAPP: { body: { codigo: any } }) => {
        expect(resAPP.body.codigo).toEqual('welcome')
        done()
      })
  })
})
