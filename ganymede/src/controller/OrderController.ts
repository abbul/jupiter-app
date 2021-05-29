// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import OrderRepository from '../repository/OrderRepository'
import { eNewOrder } from '../event/themisto'
import { orderRequestScheme } from '../schemes'
import BaseController from './BaseController'

export class OrderController extends BaseController {
  /**
   * Creara una nueva orden. Deleraga la busqueda a "themisto", en un nuevo proceso de node.
   */
  async create(req: Request) {
    const { query, provider, options, callback_url: callbackUrl } = req.body
    try {
      await orderRequestScheme.validateAsync({ query, provider, options, callbackUrl })
    } catch (err) {
      return this.responseJSON(false, 'order-missing_parameter', 'Faltan Parametros', err, 400)
    }

    try {
      const order = await OrderRepository.save({
        status: 'received',
        query,
        provider,
        options,
        callback_url: callbackUrl,
        createdAt: new Date(Date.now())
      })
      const resultChild = await eNewOrder(order)
      if (!resultChild) {
        return this.responseJSON(true, 'order-error_child', 'Error Interno al empezar busqueda', [])
      }
      return this.responseJSON(true, 'order-success', 'Orden creada', order, 201)
    } catch (error) {
      return this.responseJSON(false, 'order-error_internal_fork', 'Error Interno del fork.', error)
    }
  }

  /**
   * Retornara la orden que cumpla con el ID recibido.
   */
  async read(req: Request) {
    const { order_id: orderID } = req.params
    const order = await OrderRepository.findByID(orderID)

    if (!order) {
      return this.responseJSON(false, 'order-not_found', 'Orden no encontrada', [])
    }
    return this.responseJSON(true, 'order-sent', 'Orden enviada', order)
  }

  /**
   * Retornara todas las ordenes existentes.
   */
  async readMany(req: Request) {
    const orders = await OrderRepository.findAll()
    if (!orders) {
      return this.responseJSON(false, 'order-not_found', 'No hay ordenes', [])
    }
    return this.responseJSON(true, 'orders-sent', 'Ordenes enviadas', orders)
  }
}
