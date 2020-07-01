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
      const { status, orderID } = message
      if (status === 'processing') {
        await OrderRepository.update(orderID, { status: 'processing' })
      } else if (status === 'failed') {
        await OrderRepository.update(orderID, { status: 'failed' })
      } else if (status === 'fulfilled') {
        const { data } = message
        const orderUpdated = await OrderRepository.update(orderID, { status: 'fulfilled', list_result: data })
        if (!orderUpdated) {
          console.info(`Error al actualizar la ORDER_ID =${orderID}`)
        }
        const products = await ProductRepository.saveMany(data)
        if (!products) {
          console.info(`Error al persistir productos de ORDER_ID =${orderID}`)
        }
        axios(orderUpdated.callback_url, {
          method: 'POST',
          data: {
            status: 'fulfilled',
            api: {
              url: `https://ganymede-api/api/product/search-order/${orderID}`,
              method: 'GET'
            }
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((body) => body.data)
          .catch(() => console.log('err :>> ', 'ERR'))
          .then(() => console.log('res :>> ', 'OK'))
      }
    })
    return true
  } catch {
    return false
  }
}
