const {citaModel} = require('./citaSchema') //import from model schema

async function insertCita(ad, res) {
  var newAsd = new citaModel (ad);
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
      return res.send(insertedId);
    }
  });
}

async function getCitas() {
  return await citaModel.find({}).sort('fecha_update')
}

async function getCitasByConsultorio(id_consultorio) {
  return await citaModel.find({id_consultorio: id_consultorio}).sort('fecha_update')
}

async function getCitasxMesxConsultorio() {
  return await citaModel.aggregate([
    { $group: {
        _id: {name: "$id_consultorio", month: {$month: "$fecha"}},
        count: { $sum: 1}
    }},
    {$sort:{"_id.month":1}},
    {$group: {
        _id: "$_id.name",
        meses: {$push: {month: "$_id.month", count: "$count"}}
    }}
    ])
  }

  async function getCostoCitas() {
    return await citaModel.aggregate([
      { $group: { _id: "$id_consultorio", total: { $sum: { '$toInt': '$costo' }}}}
   ])
  }

async function getCitasByConsultorioToday(id_consultorio) {
  var startDate = new Date();
  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);
  var dateMidnight = new Date(startDate);
  dateMidnight.setHours(23);
  dateMidnight.setMinutes(59);
  dateMidnight.setSeconds(59);
  return await citaModel.find({id_consultorio: id_consultorio, 
    status: { $in: [ "confirmada", "nueva", "reagendada" ]}, fecha: { $gt: startDate, $lt: dateMidnight } } ).sort('fecha_update')
}

async function getCitasByConsultorioMissing(id_consultorio) {
  var startDate = new Date();
  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);
  return await citaModel.find({id_consultorio: id_consultorio, 
    status: { $in: [ "confirmada", "nueva", "reagendada" ]}, fecha: { $lt: startDate } } ).sort('fecha_update')
}

async function getCitaByID(id) {
  return await citaModel.findById(id)
}

async function getcitaByPaciente(idpaciente){
  return await citaModel.findOne( {id_paciente: idpaciente, status: { $in: [ "confirmada", "nueva", "reagendada" ]} } ).sort('fecha_update')
}

async function deleteCita(id, res) {
  await citaModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateCita(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  ad.fecha_update = new Date();
  await citaModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertCita,
  getCitas,
  getCitaByID,
  deleteCita,
  updateCita,
  getcitaByPaciente,
  getCitasByConsultorio,
  getCitasByConsultorioToday,
  getCitasByConsultorioMissing,
  getCitasxMesxConsultorio,
  getCostoCitas,
};