const {getDatabase} = require('../../congo_conf');
const {asdModel} = require('./asdSchema') //import from model schema
// const {ObjectID} = require('mongodb');
const {mongoose} = require('mongoose');

async function insertAd(ad) {
  var newAsd = new asdModel (ad);
  var insertedId = newAsd.save(function (err) {
    if (err) return handleError(err);
  });
  return insertedId;
}

async function getAds() {
  return await asdModel.find({}).sort('updateDate')
}

async function getAdsbyID(id) {
  return await asdModel.findById(id)
}

async function deleteAd(id, res) {
  await asdModel.findOneAndRemove({_id: id},function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully removed'});
  });
}

async function updateAd(id, ad, res) {
  const database = await getDatabase();
  delete ad._id;
  await asdModel.findOneAndUpdate({_id: id},ad,function(err, doc){
    if (err) return res.status(500).send({ error: err });
    if (!doc) return res.status(404).send({ message: "not found" });
    return res.send({message: 'succesfully updated'});
  });
}

module.exports = {
  insertAd,
  getAds,
  deleteAd,
  updateAd,
  getAdsbyID,
};