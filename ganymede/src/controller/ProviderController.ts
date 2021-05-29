// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import ProviderRepository from '../repository/ProviderRepository'
import BaseController from './BaseController'

export class ProviderController extends BaseController {
  /**
   * Retorna todas los proveedores.
   */
  async read(req: Request, res: Response) {

    const products = await ProviderRepository.findAll()

    if (products.length < 1) {
      return this.responseJSON(false, 'products-category_not_found', 'No hay productos de esa categoria', [])
    }
    return this.responseJSON(true, 'products-sent', 'Productos enviados', products)
  }
}
