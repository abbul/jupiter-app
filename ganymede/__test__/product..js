const request = require('supertest')
const app = require('../build/app')
const category = 'zapato'

describe('ProductController', () => {
  test('Read Products By Category', done => {
    request(app)
      .get(`/api/product/category/${category}`)
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('products-sent')
        done()
      })
  })
})
