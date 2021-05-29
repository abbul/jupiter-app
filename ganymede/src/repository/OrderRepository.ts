// eslint-disable-next-line no-unused-vars
import Order from '../model/Order'
// eslint-disable-next-line no-unused-vars
import { IOrder } from '../interface/IOrder'
import { DatabasesError } from '../exceptions'
class OrderRepository {
  private model: any

  constructor(model: any) {
    this.model = model
  }

  async save(objOrder: IOrder) {
    try {
      return await this.model.create(objOrder)
    } catch (error) {
      console.error('error.message :>> ', error.message)
      throw new DatabasesError('Order Error', 'Insert Error')
    }
  }

  async findByID(id: string) {
    try {
      return await this.model.findById(id)
    } catch (error) {
      console.error('error.message :>> ', error.message)
      throw new DatabasesError('Order Error', 'FindBy Error')
    }
  }

  async findAll() {
    try {

      return await this.model.find().select('query provider status created_at')
    } catch (error) {
      console.error('error.message :>> ', error.message)
      throw new DatabasesError('Order Error', 'FindAll Error')
    }
  }

  async update(id: String, objOrder: Object) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: id },
        objOrder,
        {
          new: true,
          runValidators: true,
          context: 'query'
        }
      )

    } catch (error) {
      console.error('error.message :>> ', error.message)
      throw new DatabasesError('Order Error', 'Update Error')
    }
  }
}

export default new OrderRepository(Order)
