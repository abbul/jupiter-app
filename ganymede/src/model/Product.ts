import mongoose from 'mongoose'

const Product = new mongoose.Schema({
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
    type: mongoose.SchemaTypes.Decimal128,
    ref: 'Price',
    required: [true, 'The property Price is required']
  },
  original_price: {
    type: mongoose.SchemaTypes.Decimal128,
    ref: 'Original Price',
    required: false
  },
  category: {
    type: String,
    ref: 'Category',
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

export default mongoose.model('Product', Product)
