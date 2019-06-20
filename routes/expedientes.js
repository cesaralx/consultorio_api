var express = require('express');
var router = express.Router();
const expeCollection = require('../src/database/collections/expedientes/expediente');
var methods = require("../src/auth/method")


router.get('/', async function(req, res, next) {
  var allusr = await expeCollection.getExpes()
  // console.log(allusr)
  res.send(allusr);
});

// get por id
router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await expeCollection.getExpeByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "expediente not found"});
  else
  res.send(adsID);
});

router.get('/byPaciente', async function(req, res) {
    // console.log('id a consultar', req.query.id)
    var adsID = await expeCollection.getExpeByPaciente(req.query.id);
    if (!adsID)  res.status(404).json({"message": "expediente not found"});
    else
    res.send(adsID);
  });

router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await expeCollection.insertExpe(newAd, res);
});

router.delete('/', async function(req, res) {
  await expeCollection.deleteExpe(req.query.id, res);
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await expeCollection.updateExpe(req.query.id, updatedAd, res);
});

module.exports = router;
