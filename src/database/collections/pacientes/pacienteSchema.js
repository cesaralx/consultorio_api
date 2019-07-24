var mongoose = require('mongoose');
var randomstring = require("randomstring");
var Schema = mongoose.Schema;

var pacienteSchema = new Schema({

  nombre: {type: String, required: true},
  edad: { type: Number, min: 1, max: 99},
  telefono: Number,
  email: {type: String, lowercase: true, required: true, unique: true, index: true},
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
  login: {
    usuario: {type: String, default: function() {
      return randomstring.generate(7);
  }},
    password: {type: String, default: function(){
      return randomstring.generate({
        length: 7,
        charset: 'numeric'
      });
    }}
  },
  refiere: String,
  status: {type: String, enum: ['enabled', 'disabled'], default: 'enabled'},
  image: Buffer,
  fecha_alta: { type: Date, default: Date.now },
  fecha_update: { type: Date, default: Date.now },
});

pacienteSchema.index({ email: 1 }, { unique: true});

// Compile model from schema
var pacienteModel = mongoose.model('pacienteSchema', pacienteSchema );

module.exports = {
  pacienteModel,
  };