const Product = require('../models/product');
const Genre = require('../models/genre');
const Seller = require('../models/seller');
const async = require('async');

exports.product = (req, res, next) => {
  async.parallel({
    product: (callback) => {
      Product.findById(req.params.id).exec(callback);
    },
  }, (err, result) => {
    if(err){
      return next(err);
    }
    if(result.product == null){
      let err = new Error('Products not found');
      err.status = 404;
      return next(err);
    }

    async.parallel({
      genre: (callback) => {
        Genre.findById(result.product.genres).exec(callback)
      },
      seller: (callback) => {
        Seller.findById(result.product.seller).exec(callback)
      }
    }, (err, resultTwo) => {
      if(err){
        return next(err);
      }

      res.render('product', {product: result.product, genre: resultTwo.genre, seller: resultTwo.seller});
    })
  })
}