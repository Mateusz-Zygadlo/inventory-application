const Seller = require('../models/seller');
const Product = require('../models/product');
const async = require('async');

exports.seller = (req, res, next) => {
  async.parallel({
    seller: (callback) => {
      Seller.findById(req.params.id).exec(callback);
    },
    seller_products: (callback) => {
      Product.find({seller: req.params.id}).exec(callback);
    } 
  }, (err, result) => {
    if(err){
      return next(err);
    }
    if(result.seller == null){
      let err = new Error('Seller not found');
      err.status = 404

      return next(err);
    }

    res.render('seller', {seller: result.seller, seller_products: result.seller_products})
  })
}