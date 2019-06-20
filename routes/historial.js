var express = require('express');
var router = express.Router();
const histColl = require('../src/database/collections/historial/historial');
var methods = require("../src/auth/method")


router.get('/', async function(req, res, next) {
  var allusr = await histColl.getHists()
  // console.log(allusr)
  res.send(allusr);
});

router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await histColl.getHistByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "paciente not found"});
  else
  res.send(adsID);
});

router.get('/byExp', async function(req, res) {
    // console.log('id a consultar', req.query.id)
    var adsID = await histColl.getHistByExp(req.query.id_exp);
    if (!adsID)  res.status(404).json({"message": "paciente not found"});
    else
    res.send(adsID);
  });

router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await histColl.insertHist(newAd, res);
});

router.delete('/', async function(req, res) {
  await histColl.deleteHist(req.query.id, res);
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await histColl.updateHist(req.query.id, updatedAd, res);
});

module.exports = router;
