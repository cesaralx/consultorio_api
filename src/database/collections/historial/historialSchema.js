var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historialSchema = new Schema({

  id_expediente:  Schema.Types.ObjectId, //https://stackoverflow.com/questions/22244421/how-to-create-mongoose-schema-with-array-of-object-ids
  id_visitas: [{ type : Schema.Types.ObjectId, ref: 'Visitas' }],
  fecha_update: { type: Date, default: Date.now },

});

// Compile model from schema
var historialModel = mongoose.model('historialSchema', historialSchema );

module.exports = {
  historialModel,
  };