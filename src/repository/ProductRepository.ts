// eslint-disable-next-line no-unused-vars
import Product from '../model/Product'
// eslint-disable-next-line no-unused-vars
import { IProduct } from '../interface/IProduct'
class ProductRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async saveMany (objProduct : Array<IProduct>) {
    return await this.model.create(objProduct)
  }

  async findByCategory (categoryID: string) {
    return await this.model.find({ category: categoryID })
  }
}

export default new ProductRepository(Product)
