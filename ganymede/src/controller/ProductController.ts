// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import ProductRepository from '../repository/ProductRepository'
import { responseJSON } from '../util/responseJSON'

export class ProductController {
  /**
   * Retornara todas los productos existentes que cumplan con la categoria recibida.
   */
  async readForProductCategoryID (req: Request, res: Response) {
    const { product_category_id: productCategoryID } = req.params
    const products = await ProductRepository.findByCategory(productCategoryID)

    if (products.length < 1) {
      return responseJSON(false, 'products-category_not_found', 'No hay productos de esa categoria', [])
    }
    return responseJSON(true, 'products-sent', 'Productos enviados', products)
  }
}
