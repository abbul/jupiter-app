import Order from '../model/Order'
class OrderRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async save (objOrder : any) {
    return await this.model.create(objOrder)
  }

  async findByID (id : string) {
    try {
      return await this.model.findById(id)
    } catch (error) {
      return undefined
    }
  }

  async findToCategory (categoryID: string) {
    return await this.model.find(categoryID)
  }

  async findAll () {
    return await this.model.find()
  }

  async update (id : String, objOrder : JSON) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      objOrder,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

export default new OrderRepository(Order)
