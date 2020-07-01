import OrderRepository from '../repository/OrderRepository'
import ProductRepository from '../repository/ProductRepository'
import axios from 'axios'
import { fork } from 'child_process'
import path from 'path'
const pathThemisto = path.join(__dirname, '..\\..\\..\\themisto\\src\\app.js')

export const eNewOrder = async (order : any) => {
  try {
    const childThemisto = fork(pathThemisto, order)
    childThemisto.send({ orderID: order.id, provider: order.provider, query: order.query })
    childThemisto.on('message', async message => {
      if (message.status === 'processing') {
        await OrderRepository.update(message.orderID, { status: 'processing' })
      } else if (message.status === 'failed') {
        await OrderRepository.update(message.orderID, { status: 'failed' })
      } else if (message.status === 'fulfilled') {
        const orderUpdated = await OrderRepository.update(message.orderID, { status: 'fulfilled', result: message.data })
        await ProductRepository.saveMany(message.data)
        /*
        axios(orderUpdated.callback_url, {
          method: 'POST',
          data: {
            body: message.data
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((body) => body.data)
          .catch((err) => console.log('err :>> ', err))
          .then(res => console.log('res :>> ', res))
          */
      }
    })
    return true
  } catch {
    return false
  }
}
