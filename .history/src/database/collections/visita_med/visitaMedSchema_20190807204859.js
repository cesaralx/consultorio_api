var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitaMedSchema = new Schema({

  id_cita: Schema.Types.ObjectId,
  id_paciente: Schema.Types.ObjectId,
  id_consultorio: Schema.Types.ObjectId,
  id_usuario: Schema.Types.ObjectId,
  fecha:  { type: Date },
  motivo: String,
  anexos: [{ type : Buffer, ref: 'anexos' }],
  // anexos: [{
  //    archivo: Buffer,
  //    namefile: String,
  //    dataTipe: String
  // }],
  filenames: [{type: String, ref: 'filenames'}],
  tipoFile: [{type: String, ref: 'tipoFile'}],
  receta:{
    medicamento: String,
  },
});

// Compile model from schema
var visitaMedModel = mongoose.model('visitaMedSchema', visitaMedSchema );

module.exports = {
  visitaMedModel,
  };