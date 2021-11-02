const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: 'string',
    require: true,
    maxLength: 50,
  },
  description: {
    type: 'string',
    require: true,
    maxLength: 250,
  },
  genres: {
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  },
  count: {
    type: 'number',
    require: true,
    maxLength: 50,
  },
  images: {
    type: 'string',
  },
  price: {
    type: 'number',
    require: true,
    maxLength: 100000,
  },
})

module.exports = mongoose.model('Product', ProductSchema);