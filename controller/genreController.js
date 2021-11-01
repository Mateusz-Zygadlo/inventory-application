const Genre = require('../models/genre');
const Product = require('../models/product');
const async = require('async');

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, genre_list) => {
      if(err){
        return next(err);
      }

      res.render('genres_list', { genre_list: genre_list})
    })
}

exports.genre_detail = (req, res, next) => {
  async.parallel({
    genre: (callback) => {
      Genre.findById(req.params.id).exec(callback)
    },
    genre_products: (callback) => {
      Product.find({'genres': req.params.id}).exec(callback)
    },
  }, function(err, result){
    if(err){
      return next(err);
    }
    if(result.genre == null){
      const err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }

    res.render('genre_detail', {genre: result.genre, genre_products: result.genre_products})
  })
}