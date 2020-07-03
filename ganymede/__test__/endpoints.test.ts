import supertest from 'supertest'
import app from '../src/app'
const request = supertest(app)
let orderID : String
const providerOK = {
  query: 'remera',
  provider: 'zara',
  options: {
  },
  callback_url: 'http://hola.com'
}

describe('All endpoints', () => {
  beforeAll(async (done) => {
    setTimeout(() => {
      done()
    }, 2000)
  })
  test('Welcome -- /', async done => {
    const result : any = await request.get('/')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('welcome')
    done()
  })

  test('Create Order -- /api/product/search', async done => {
    const result : any = await request.post('/api/product/search').send(providerOK)
    expect(result.statusCode).toEqual(201)
    expect(result.body.result).toEqual('order-success')
    expect(result.body.body.id).not.toEqual(null)
    orderID = result.body.body.id
    done()
  })

  /*
  test('Read Order By ID -- api/product/search-order/', async done => {
    const result : any = await request.get(`api/product/search-order/${orderID}`)
    expect(result.statusCode).toEqual(200)
    expect(result.body.body.id).toEqual(orderID)
    expect(result.body.result).toEqual('order-sent')
    done()
  })

  test('Read All Order -- /api/product/search-orders', async done => {
    const result : any = await request.get('api/product/search-orders/')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('orders-sent')
    done()
  })
  */

  test('Read Products By Category -- /api/product/category/:product_category_id', async done => {
    const result : any = await request.get('/api/product/category/CategoryIdErr')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('products-sent')
    done()
  })
})
