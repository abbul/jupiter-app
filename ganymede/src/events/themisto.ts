import OrderRepository from '../repository/OrderRepository'
import ProductRepository from '../repository/ProductRepository'
import axios from 'axios'
import { fork } from 'child_process'
import path from 'path'
const pathThemisto = path.join(__dirname, '../../../themisto/src/app.js')

/**
 * Delegara la orden de busqueda a "themisto". A su vez notificara el resultado de la misma.
 * @param order Es la orden de busqueda
 */
export const eNewOrder = async (order : any) => {
  try {
    const childThemisto = fork(pathThemisto, order)
    childThemisto.send({ orderID: order.id, provider: order.provider, query: order.query })
    childThemisto.on('message', async message => {
      await validMessage(message)
    })
    return true
  } catch {
    return false
  }
}

/**
 * Validamos que tipo de estado nos respondio "themisto" y notificamos al creador de la orden.
 * @param message Es el message que nos envia "themisto" con el resultado de order.
 */
const validMessage = async (message : any) => {
  const { status, orderID, data } = message
  switch (status) {
    case 'processing': {
      await OrderRepository.update(orderID, { status: 'processing' })
      break
    }

    case 'failed': {
      console.log('failed-message :>> ', data)
      const orderUpdated = await OrderRepository.update(orderID, { status: 'failed', updated_at: Date.now() })
      await sendResultOrder(orderUpdated.callback_url, orderUpdated.status, orderUpdated.id)
      break
    }

    case 'fulfilled': {
      const orderUpdated = await OrderRepository.update(orderID, { status: 'fulfilled', updated_at: Date.now(), list_result: data })
      if (!orderUpdated) {
        console.info(`Error al actualizar la ORDER_ID =${orderID}`)
      }
      const products = await ProductRepository.saveMany(data)
      if (!products) {
        console.info(`Error al persistir productos de ORDER_ID =${orderID}`)
      }
      await sendResultOrder(orderUpdated.callback_url, orderUpdated.status, orderUpdated.id)
      break
    }
  }
}

/**
 * Consume un endpoint para notificar el resultado de la orden.
 * @param url Es la url que consumiremos.
 * @param status Es el estado final de la orden.abs
 * @param orderID Es el id de la orden
 */
const sendResultOrder = async (url : string, status : string, orderID : string) => {
  return axios(url, {
    method: 'POST',
    data: {
      order_id: orderID,
      status: status,
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
