import Product from '../model/Order'
class ProductRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async save (objProduct : JSON) {
    return await this.model.create(objProduct)
  }

  async saveMany (objProduct : Array<Object>) {
    return await this.model.create(objProduct)
  }

  async find (id : string) {
    return await this.model.find(id)
  }

  async findByCategory (categoryID: string) {
    return await this.model.find({ category_id: categoryID })
  }

  async findAll () {
    return await this.model.find()
  }

  async update (id : String, usuario : String) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      usuario,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

export default new ProductRepository(Product)
