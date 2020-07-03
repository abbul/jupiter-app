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

  test('Create Order -- ERROR - /api/product/search', async done => {
    const result : any = await request.post('/api/product/search').send({ ...providerOK, callback_url: 'a' })
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('order-error_internal')
    done()
  })

  test('Read Order -- api/product/search-order/:order_id', async done => {
    const result : any = await request.get(`/api/product/search-order/${orderID}`)
    expect(result.statusCode).toEqual(200)
    expect(result.body.body.id).toEqual(orderID)
    expect(result.body.result).toEqual('order-sent')
    done()
  })

  test('Read Order -- ERROR -- api/product/search-order/:order_id', async done => {
    const result : any = await request.get('/api/product/search-order/fffffff')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('order-not_found')
    done()
  })

  test('Read All Order -- /api/product/search-orders', async done => {
    const result : any = await request.get('/api/product/search-orders/')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('orders-sent')
    done()
  })

  test('Read Products --- /api/product/category/:product_category_id', async done => {
    const result : any = await request.get('/api/product/category/camiseta')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('products-sent')
    done()
  })

  test('Read Products -- ERROR -- /api/product/category/:product_category_id', async done => {
    const result : any = await request.get('/api/product/category/xxxxxxx')
    expect(result.statusCode).toEqual(200)
    expect(result.body.result).toEqual('products-category_not_found')
    done()
  })
})
