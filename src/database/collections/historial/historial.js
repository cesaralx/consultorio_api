const {historialModel} = require('./historialSchema') //import from model schema

async function insertHist(ad, res) {
  var newAsd = new historialModel (ad);
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

async function getHists() {
  return await historialModel.find({}).sort('fecha_update')
}

async function getHistByID(id) {
  return await historialModel.findById(id)
}

async function getHistByExp(id_exp) {
  return await historialModel.find({id_exp: id_exp})
}

async function deleteHist(id, res) {
  await historialModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateHist(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  ad.fecha_update = new Date();
  await historialModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertHist,
  getHists,
  getHistByID,
  deleteHist,
  updateHist,
  getHistByExp,
};