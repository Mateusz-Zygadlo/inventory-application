const Seller = require('../models/seller');
const Product = require('../models/product');
const async = require('async');
const { validationResult } = require("express-validator");

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

exports.newSeller = [
  (req, res, next) => {
    const errors =  validationResult(req);

    const seller = new Seller({
      firstName: req.body.sellerFirstName,
      lastName: req.body.sellerLastName,
      description: req.body.sellerDescription,
    })

    if(!errors.isEmpty()){
      res.render('seller_form');

      return
    }else{
      Seller.findOne({firstName: req.body.sellerFirstName})
        .exec((err, result) => {
          if(err){
            return next(err);
          }
          if(result){
            res.redirect('/')
          }else{
            seller.save((err) => {
              if(err){
                return next(err);
              }
              res.redirect(`/seller/${seller._id}`)
            })
          }
        })
    }
  }
]

exports.deleteSeller = (req, res, next) => {
  async.parallel({
    seller: (callback) => {
      Seller.findById(req.params.id).exec(callback);
    },
    sellerProducts: (callback) => {
      Product.find({seller: req.params.id}).exec(callback);
    }
  }, (err, result) => {
    if(err){
      return next(err);
    }
    if(result.seller == null){
      let err = new Error('Seller not found');
      err.status = 404;
      return next(err);
    }

    if(!result.sellerProducts.length){
      res.render('seller_confirm_page', {confirm: 'Are you sure', seller: result.seller})
    }else{
      res.render('delete_page', {genre: result.seller, products: result.sellerProducts})
    }
  })
}

exports.confirmDeleteSeller = (req, res, next) => {
  Seller.deleteOne({_id: req.body.confirmButton}).exec((err, result) => {
    if(err){
      return next(err);
    }else{
      res.redirect('/');
    }
  })
}

exports.updateSeller = (req, res, next) => {
  Seller.findById(req.params.id).exec((err, result) => {
    if(err){
      return next(err);
    }

    res.render('seller_form', {genre: result})
  })
}

exports.updateSellerPost = [
  (req, res, next) => {
    const error = validationResult(req);

    const seller = new Seller({
      _id: req.params.id,
      firstName: req.body.sellerFirstName,
      lastName: req.body.sellerLastName,
      description: req.body.sellerDescription,
    })

    if(!error.isEmpty()){
      res.render('genre_form', {genre: genre})

      return;
    }else{
      Seller.findByIdAndUpdate(req.params.id, seller, {}, (err, result) => {
        if(err){
          return next(err);
        }

        res.redirect(`/seller/${req.params.id}`);
      })
    }
  }
]