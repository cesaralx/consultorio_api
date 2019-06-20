const {consultorioModel} = require('./consultorioSchema') //import from model schema

async function insertConsul(ad, res) {
  var newAsd = new consultorioModel (ad);
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
      return res.send({ message: 'New consultorio inserted.' });
    }
  });
}

async function getConsuls() {
  return await consultorioModel.find({}).sort('fecha_update')
}

async function getConsulByID(id) {
  return await consultorioModel.findById(id)
}

async function deleteConsul(id, res) {
  await consultorioModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateconsul(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  ad.fecha_update = new Date();
  await consultorioModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertConsul,
  getConsuls,
  getConsulByID,
  deleteConsul,
  updateconsul,
};