const request = require('supertest')
const app = require('../build/app')
let orderID
const providerOK = {
  query: 'remera',
  provider: 'zara',
  options: {
  },
  callback_url: 'http://hola.com'
}

describe('OrderController', () => {
  test('Create Order', done => {
    request(app)
      .post('/api/product/search')
      .send(providerOK)
      .then(resAPP => {
        orderID = resAPP.body.id
        expect(resAPP.body.codigo).toEqual('order-success')
        done()
      })
  })

  test('Read Order By ID', done => {
    request(app)
      .get(`api/product/search-order/${orderID}`)
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('order-sent')
        done()
      })
  })

  test('Read All Order', done => {
    request(app)
      .get('/api/product/search-orders')
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('orders-sent')
        done()
      })
  })
})
