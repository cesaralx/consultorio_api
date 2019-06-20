var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var asdSchema = new Schema({
  title:  {type: String, required: true},
  author: String,
  body:   String,
  image: Buffer,
  age: { type: Number, min: 18, max: 65, required: true },
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  meta: {
    votes: Number,
    favs:  Number
  },
  updateDate: { type: Date, default: Date.now },
});

// Compile model from schema
var asdModel = mongoose.model('asdSchema', asdSchema );

module.exports = {
    asdModel,
  };