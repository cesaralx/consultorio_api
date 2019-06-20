var express = require('express');
var router = express.Router();
const consulColl = require('../src/database/collections/consultorio/consultorio');
var methods = require("../src/auth/method")


router.get('/', async function(req, res, next) {
  var allusr = await consulColl.getConsuls()
  // console.log(allusr)
  res.send(allusr);
});

router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await consulColl.getConsulByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "consultorio not found"});
  else
  res.send(adsID);
});


router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await consulColl.insertConsul(newAd, res);
});

router.delete('/', async function(req, res) {
  await consulColl.deleteConsul(req.query.id, res);
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await consulColl.updateconsul(req.query.id, updatedAd, res);
});

module.exports = router;
