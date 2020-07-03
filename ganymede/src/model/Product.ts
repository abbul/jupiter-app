import mongoose from 'mongoose'
// eslint-disable-next-line no-unused-vars
import { IProduct } from '../interface/IProduct'

export interface IProductModel extends IProduct, mongoose.Document {};

export const ProductSchema = new mongoose.Schema({
  sku: {
    type: String,
    ref: 'Sku',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property sku is required']
  },
  name: {
    type: String,
    ref: 'Name',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Name is required']
  },
  price: {
    type: mongoose.Types.Decimal128,
    ref: 'Price',
    required: [true, 'The property Price is required']
  },
  original_price: {
    type: mongoose.Types.Decimal128,
    ref: 'Original Price',
    required: false
  },
  category: {
    type: String,
    ref: 'Category',
    lowercase: true,
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Category is required']
  },
  description: {
    type: String,
    ref: 'Description',
    minlength: 3,
    maxlength: 50,
    required: [false]
  },
  image: {
    type: String,
    ref: 'Image',
    minlength: 20,
    maxlength: 500,
    required: [true, 'The property Image is required']
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrdenID',
    required: [true, 'The property OrdenID is required']
  }
}, {
  collection: 'product',
  toJSON: {
    virtuals: true
  }
})

const Product = mongoose.model<IProductModel>('Product', ProductSchema)
export default Product
