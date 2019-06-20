var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expeSchema = new Schema({

  paciente_id: Schema.Types.ObjectId,
  motivo_consulta: {type: String, required: true},
  Ante_familiares:{
    hipertension: String,
    cancer: String,
    diabetes: String,
    otros: String,
  },
  Ante_no_patologicos: {
    vacunas_res: String,
    escolaridad: String,
    grupo_rh: String,
    seguro_social: String,
  },
  Ante_fam_pato: {
    cirugias: String,
    transfuciones: {
      transfucion: Boolean,
      motivo: String,
    },
    fracturas: String,
    hospitalizaciones: String,
    fumar: {
      fuma: Boolean,
      cantidad: Number,
    },
    alcohol: String,
    alergias: {
      alergia: String,
      efecto: String,
    },
    patologias_cronicas_degenerativas: String,
  },
  antecedentes_gineco_obst: {
    Menarca: String,
    remove: String,
    eumenorreica: String,
    dismenorreica: String,
    ivsa: String,
    parejas_exuales: String,
    mdf_tipo: String,
    tiempo_de_uso: String,
    causas_descontinuo: String,
    g: String,
    p: String,
    c: String,
    a: String,
    ffp: String,
    fup: String
  },
  colonia: String,
  celular: Number,
  email: {type: String, lowercase: true, required: true},
  fecha_alta: { type: Date, default: Date.now },
  fecha_update: { type: Date, default: Date.now },
  consultorio_alta: Schema.Types.ObjectId,
  consultorio_update:Schema.Types.ObjectId,
  status: {type: String, enum: ['enabled', 'disabled'], default: 'enabled'},
  usuario_alta: Schema.Types.ObjectId,
  usuario_mod: Schema.Types.ObjectId,

});

// Compile model from schema
var expeModel = mongoose.model('expeSchema', expeSchema );

module.exports = {
  expeModel,
  };