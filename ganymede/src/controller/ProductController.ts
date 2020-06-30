import { Request, Response } from 'express'
import ProductRepository from '../repository/ProductRepository'
import OrderRepository from '../repository/OrderRepository'
import { responseJSON } from '../utils/responseJSON'

export class ProductController {
  async create (req : Request, res : Response) {
    // llamamos a  Thesito para que realice la busqueda en la pagina
    const resultThemisto : any = {}

    if (resultThemisto.status !== 'success') {
      return 'error'
    }

    // persitimos todos los objetos en la base de datos
    const products = await ProductRepository.saveMany(resultThemisto)

    // ... esperamos, luego que recibamos los datos. los persistimos en la db y retornamos el resultado
    const updateOrder = await OrderRepository.update(products.id, products)

    return updateOrder
  }
}
