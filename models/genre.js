const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: 'string',
    require: true,
  },
  description: {
    type: 'string',
    require: true,
  }
})

module.exports = GenreSchema;
module.exports = mongoose.model('Genre', GenreSchema);