const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  firstName: {
    type: 'string',
    require: true,
  },
  lastName: {
    type: 'string',
    require: true,
  },
  description: {
    type: 'string',
    require: true,
  },
  sellerNick: {
    type: 'string',
    require: true,
  }
})

module.exports = mongoose.model('Seller', SellerSchema);