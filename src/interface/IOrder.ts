// eslint-disable-next-line no-unused-vars
import { IProduct } from '../interface/IProduct'
export interface IOrder {
    query: string
    provider: string
    options?: Object
    // eslint-disable-next-line camelcase
    callback_url: string
    status: string
    createdAt: Date
    updatedAt?: Date
    listResult?: Array<IProduct>
  };
