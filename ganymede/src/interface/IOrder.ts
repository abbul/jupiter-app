// eslint-disable-next-line no-unused-vars
import { IProduct } from '../interface/IProduct'
export interface IOrder {
    query: string
    provider: string
    options?: Object
    callbackUrl: string
    status: string
    createdAt: Date
    updatedAt?: Date
    listResult?: Array<IProduct>
  };
