const Genre = require('../models/genre');

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