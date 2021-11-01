const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: 'string',
    require: true,
  },
  description: {
    type: 'string',
    require: true,
  },
  genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  seller: [{
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  }],
  count: {
    type: 'number',
    require: true,
  },
  images: {
    type: 'string',
  },
  price: {
    type: 'number',
    require: true,
  },
})

module.exports = mongoose.model('Product', ProductSchema);