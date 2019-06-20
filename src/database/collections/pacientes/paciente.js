const {pacienteModel} = require('./pacienteSchema') //import from model schema

async function insertPaciente(ad, res) {
  var newAsd = new pacienteModel (ad);
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
      // return res.send({ message: 'New user inserted.' });
      return res.send(insertedId);
    }
  });
}

async function getPacientes() {
  return await pacienteModel.find({}).sort('fecha_update')
}

async function getPacienteByID(id) {
  return await pacienteModel.findById(id)
}

async function deletePaciente(id, res) {
  await pacienteModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updatePaciente(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  ad.fecha_update = new Date();
  await pacienteModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertPaciente,
  getPacientes,
  getPacienteByID,
  deletePaciente,
  updatePaciente,
};