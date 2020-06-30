// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { validSearch } from '../utils/validObjects'
import ProductRepository from '../repository/ProductRepository'
import OrderRepository from '../repository/OrderRepository'
import { responseJSON } from '../utils/responseJSON'
import { fork } from 'child_process'

export class OrderController {
  async create (req: Request, res: Response) {
    const { query, provider, options, callback_url: callbackUrl } = req.body
    const result = validSearch(query, provider, options, callbackUrl)

    if (result.length > 0) {
      return responseJSON(false, 'order-missing_parameter', 'Faltan Parametros', result)
    }

    const order = await OrderRepository.save({
      query,
      provider,
      options,
      callback_url: callbackUrl
    })

    if (!order) {
      return responseJSON(false, 'order-error_internal', 'Error Interno', [])
    }

    try {
      const child = fork(`${__dirname}/app.js`, order)

      child.on('message', function (m) {
        console.log('El PADRE tiene mensaje: ', m)
      })
      return responseJSON(true, 'order-success', 'Orden creadad', order)
    } catch (error) {
      return responseJSON(false, 'order-error_internal_fork', 'Error Interno del fork.', order)
    }
  }

  async read (req: Request, res: Response) {
    const { order_id: orderID } = req.params
    const order = await OrderRepository.findByID(orderID)

    if (!order) {
      return responseJSON(false, 'order-not_found', 'Orden no encontrada', [])
    }
    return responseJSON(true, 'order-sent', 'Orden enviada', order)
  }

  async readMany (req: Request, res: Response) {
    const orders = await OrderRepository.findAll()
    if (!orders) {
      return responseJSON(false, 'order-not_found', 'No hay ordenes', [])
    }
    return responseJSON(true, 'orders-sent', 'Ordenes enviadas', orders)
  }

  async readForProductCategoryID (req: Request, res: Response) {
    const { product_category_id: productCategoryID } = req.params
    const products = await ProductRepository.findByCategory(productCategoryID)

    if (!products) {
      return responseJSON(false, 'products-not_found', 'No hay productos', [])
    }
    return responseJSON(true, 'products-sent', 'Productos enviados', products)
  }
}
