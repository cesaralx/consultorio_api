var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consultorioSchema = new Schema({
  nombre: {type: String, required: true, unique: true, index: true},
  direccion: String,
  telefono: Number,
  encargado:  Schema.Types.ObjectId,
  status: {type: String, enum: ['enabled', 'disabled'], default: 'enabled'},
  horario: String,
  fecha_alta: { type: Date, default: Date.now },
  fecha_update: { type: Date, default: Date.now },
});

// Compile model from schema
var consultorioModel = mongoose.model('consultorioSchema', consultorioSchema );

module.exports = {
  consultorioModel,
  };