// eslint-disable-next-line no-unused-vars
import Order from '../model/Order'
// eslint-disable-next-line no-unused-vars
import { IOrder } from '../interface/IOrder'
class OrderRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async save (objOrder : IOrder) {
    try {
      return await this.model.create(objOrder)
    } catch (error) {
      console.log('error.message :>> ', error.message)
      return undefined
    }
  }

  async findByID (id : string) {
    try {
      return await this.model.findById(id)
    } catch (error) {
      return undefined
    }
  }

  async findAll () {
    return await this.model.find().select('query provider status created_at')
  }

  async update (id : String, objOrder : Object) {
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
