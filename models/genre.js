const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GenreSchema = new Schema({
  name: {
    type: 'string',
    require: true,
  },
  description: {
    type: 'string',
    require: true,
  }
})

GenreSchema
  .virtual('url')
  .get(() => {
    return '/genre/' + this._id;
})

module.exports = mongoose.model('Genre', GenreSchema);