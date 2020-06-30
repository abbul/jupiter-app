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
    type: Number,
    ref: 'Price',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Price is required']
  },
  original_price: {
    type: String,
    ref: 'Original Price',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The property Original Price is required']
  },
  category_id: {
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
    required: [true, 'The property Description is required']
  },
  images: {
    type: Array,
    min: 5,
    max: 200
  },
  searchs: [{
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrdenID',
      required: [true, 'The property OrdenID is required']
    },
    created_at: {
      type: Date,
      ref: 'Created',
      required: [true, 'The property Created is required']
    }
  }]
}, {
  collection: 'product',
  toJSON: {
    virtuals: true
  }
})

export default mongoose.model('Product', Product)
