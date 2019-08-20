const {visitaMedModel} = require('./visitaMedSchema') //import from model schema

async function insertVisMed(ad, res) {
  var newAsd = new visitaMedModel (ad);
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

async function getVisitasxMesxConsultorio() {
  return await visitaMedModel.aggregate([
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
  

async function getVisMeds() {
  return await visitaMedModel.find({}).sort('fecha')
}

async function getVisMedByID(id) {
  return await visitaMedModel.findById(id)
}

async function getVisMedByCita(idc) {
  return await visitaMedModel.find({id_cita: idc})
}

async function getVisMedBypaci(idp) {
  return await visitaMedModel.find({id_paciente: idp})
}

async function get3LastVisitas(idp) {
  return await visitaMedModel.find({id_paciente: idp}).limit(3).sort('fecha')
}

async function getVisMedByconsul(idcon) {
  return await visitaMedModel.find({id_consultorio: icon})
}

async function deleteVisMed(id, res) {
  await visitaMedModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateVisMed(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  await visitaMedModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertVisMed,
  getVisMeds,
  getVisMedByID,
  deleteVisMed,
  updateVisMed,
  getVisMedByCita,
  getVisMedBypaci,
  getVisMedByconsul,
  get3LastVisitas,
  getVisitasxMesxConsultorio,
};