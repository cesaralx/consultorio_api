var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pacienteSchema = new Schema({

  nombre: {type: String, required: true},
  edad: { type: Number, min: 1, max: 99},
  telefono: Number,
  email: {type: String, lowercase: true, required: true},
  fum: String,
  ffp: String,
  estado_civil: String,
  ocupacion: String,
  origen: String,
  municipio: String,
  conyugue: {
    nombre: String,
    ocupacion: String
  },
  refiere: String,
  status: {type: String, enum: ['enabled', 'disabled'], default: 'enabled'},
  image: Buffer,
  fecha_alta: { type: Date, default: Date.now },
  fecha_update: { type: Date, default: Date.now },
});

// Compile model from schema
var pacienteModel = mongoose.model('pacienteSchema', pacienteSchema );

module.exports = {
  pacienteModel,
  };