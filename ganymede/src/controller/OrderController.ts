// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { validSearch } from '../util/validObjects'
import OrderRepository from '../repository/OrderRepository'
import { responseJSON } from '../util/responseJSON'
import { eNewOrder } from '../event/themisto'

export class OrderController {
  /**
   * Creara una nueva orden. Deleraga la busqueda a "themisto", en un nuevo proceso de node.
   */
  async create (req: Request, res: Response) {
    const { query, provider, options, callback_url: callbackUrl } = req.body
    const result = validSearch(query, provider, options, callbackUrl)

    if (result.length > 0) {
      return responseJSON(false, 'order-missing_parameter', 'Faltan Parametros', result)
    }

    const order = await OrderRepository.save({
      status: 'received',
      query,
      provider,
      options,
      callbackUrl: 'asd',
      createdAt: new Date(Date.now())
    })

    if (!order) {
      return responseJSON(false, 'order-error_internal', 'Error Interno', [])
    }

    try {
      const resultChild = await eNewOrder(order)
      if (!resultChild) {
        return responseJSON(true, 'order-error_child', 'Error Interno al empezar busqueda', [])
      }
      return responseJSON(true, 'order-success', 'Orden creada', order, 201)
    } catch (error) {
      return responseJSON(false, 'order-error_internal_fork', 'Error Interno del fork.', order)
    }
  }

  /**
   * Retornara la orden que cumpla con el ID recibido.
   */
  async read (req: Request, res: Response) {
    const { order_id: orderID } = req.params
    const order = await OrderRepository.findByID(orderID)

    if (!order) {
      return responseJSON(false, 'order-not_found', 'Orden no encontrada', [])
    }
    return responseJSON(true, 'order-sent', 'Orden enviada', order)
  }

  /**
   * Retornara todas las ordenes existentes.
   */
  async readMany (req: Request, res: Response) {
    const orders = await OrderRepository.findAll()
    if (!orders) {
      return responseJSON(false, 'order-not_found', 'No hay ordenes', [])
    }
    return responseJSON(true, 'orders-sent', 'Ordenes enviadas', orders)
  }
}
