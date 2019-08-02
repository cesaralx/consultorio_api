const {getDatabase} = require('../../congo_conf');
const {userModel} = require('./userSchema') //import from model schema
const {mongoose} = require('mongoose');

async function insertUsr(ad, res) {
  var newAsd = new userModel (ad);
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
      return res.send({ message: 'New user inserted.' });
    }
  });
}

async function getUsrs() {
  return await userModel.find({}).sort('fecha_update')
}

async function getUsrByUser(user) {
  return await userModel.findOne({usuario: user})
}

async function getUsrByID(id) {
  return await userModel.findById(id)
}

async function getUsrByEmail(emaill) {
  return await userModel.findOne({email: emaill})
}

async function deleteUsr(id, res) {
  await userModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateUsr(id, ad, res) {
  // const database = await getDatabase();
  delete ad._id;
  ad.fecha_update = new Date();
  await userModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertUsr,
  getUsrs,
  getUsrByID,
  deleteUsr,
  updateUsr,
  getUsrByUser,
  getUsrByEmail
};