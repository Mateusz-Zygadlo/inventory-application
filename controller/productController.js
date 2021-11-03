const Product = require('../models/product');
const Genre = require('../models/genre');
const Seller = require('../models/seller');
const async = require('async');
const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema;

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

exports.newProduct = [
  (req, res, next) => {
    async.parallel({
      genre: (callback) => {
        Genre.find({name: req.body.genreName}).exec(callback);
      },
      seller: (callback) => {
        Seller.find({nick: req.body.sellerName}).exec(callback);
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }

      const errors =  validationResult(req);

    console.log(req.body);

    const product = new Product({
      title: req.body.productName,
      description: req.body.productDescription,
      count: req.body.productCount,
      price: req.body.productPrice,
      genres: mongoose.Types.ObjectId(result.genre._id),
      seller: mongoose.Types.ObjectId(result.seller._id),
    })

    if(!errors.isEmpty()){
      res.render('product_form');

      return;
    }else{
      Product.findOne({title: req.body.productName})
        .exec((err, result) => {
          if(err){
            return next(err);
          } 
          if(result){
            res.redirect('/');
          }else{
            product.save((err) => {
              if(err){
                return next(err)
              }

              res.redirect(`/product/${product._id}`)
            })
          }
        })
    }
    })
  }
]

exports.allToForm = (req, res, next) => {
  async.parallel({
    genres: (callback) => {
      Genre.find().exec(callback);
    },
    sellers: (callback) => {
      Seller.find().exec(callback);
    }
  }, (err, result) => {
    if(err){
      return next(err);
    }
    
    res.render('product_form', { genres: result.genres, sellers: result.sellers });
  })
}