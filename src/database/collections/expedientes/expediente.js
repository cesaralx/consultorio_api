const {getDatabase} = require('../../congo_conf');
const {expeModel} = require('./expSchema') //import from model schema
const {mongoose} = require('mongoose');

async function insertExpe(ad, res) {
  var newAsd = new expeModel (ad);
  var insertedId = newAsd.save(function (err) {
    if(err){
      if (err.name == 'ValidationError') {
        // console.error('Error Validating!', err.message);
        return res.status(400).json(err.message);
      } else {
        // console.error(err);
        return res.status(500).json(err.message);
      }
    }else{
      return res.send({ message: 'New expediente inserted.' });
    }
  });
}

async function getExpes() {
  return await expeModel.find({}).sort('fecha_update')
}

async function getExpesLite() {
  return await expeModel.find({},{paciente_id:1, _id:1, antecedentes_gineco_obst:1, fecha_update:1 })
}

async function getExpeByID(id) {
  return await expeModel.findById(id)
}

async function getExpeByPaciente(id) {
  return await expeModel.findOne({'paciente_id': id})
}

async function deleteExpe(id, res) {
  await expeModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateExpe(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  ad.fecha_update = new Date();
  await expeModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertExpe,
  getExpeByID,
  getExpeByPaciente,
  deleteExpe,
  updateExpe,
  getExpes,
  getExpesLite,
};