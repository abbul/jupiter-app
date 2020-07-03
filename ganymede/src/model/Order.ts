import mongoose from 'mongoose'
// eslint-disable-next-line no-unused-vars
import { IOrder } from '../interface/IOrder'

export interface IOrderModel extends IOrder, mongoose.Document {};

export const OrderSchema = new mongoose.Schema({
  query: {
    type: String,
    ref: 'Query',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Query is required']
  },
  provider: {
    type: String,
    ref: 'Provider',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Provider is required']
  },
  options: [],
  callback_url: {
    type: String,
    ref: 'Callback Url',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Callback Url is required']
  },
  status: {
    type: String,
    ref: 'Status',
    default: 'received',
    minlength: 3,
    maxlength: 50,
    required: ['The property Status is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  list_result: []
}, {
  collection: 'order',
  toJSON: {
    virtuals: true
  }
})

const Order = mongoose.model<IOrderModel>('Order', OrderSchema)
export default Order
