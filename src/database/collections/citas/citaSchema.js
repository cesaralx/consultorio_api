var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citaSchema = new Schema({
  id_paciente: Schema.Types.ObjectId,
  id_consultorio: Schema.Types.ObjectId,
  id_usuario: Schema.Types.ObjectId,
  fecha: { type: Date, default: Date.now },
  fecha_update: { type: Date, default: Date.now },
  status: {type: String, enum: ['confirmada', 'nueva', 'reagendada', 'cancelada'], default: 'nueva'},
  costo: String,
  extra: String,
});

// Compile model from schema
var citaModel = mongoose.model('citaSchema', citaSchema );

module.exports = {
  citaModel,
  };