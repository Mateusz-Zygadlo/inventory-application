const Product = require('../models/product');

exports.product = (req, res, next) => {
  Product.findById(req.params.id).exec((err, product) => {
    if(err){
      return next(err);
    }

    res.render('product', {product: product});
  })
}