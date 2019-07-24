var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  usuario: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  nombre: String,
  cargo: String,
  telefono: Number,
  nivel: { trype: Number},
  email: {type: String, lowercase: true, required: true},
  status: {type: String, enum: ['enabled', 'disabled'], default: 'enabled'},
  especialidad: String,
  image: Buffer,
  fecha_alta: { type: Date, default: Date.now },
  fecha_update: { type: Date, default: Date.now },
});
userSchema.index({ usuario: 1 }, { unique: true});

// Compile model from schema
var userModel = mongoose.model('userSchema', userSchema );

module.exports = {
  userModel,
  };