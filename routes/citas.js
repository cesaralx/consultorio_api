var express = require('express');
var router = express.Router();
const citaCollection = require('../src/database/collections/citas/cita');
var methods = require("../src/auth/method")


router.get('/', methods.ensureToken, async function(req, res, next) {
  var allusr = await citaCollection.getCitas()
  // console.log(allusr)
  res.send(allusr);
}); 

router.get('/byId', methods.ensureToken, async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await citaCollection.getCitaByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "cita not found"});
  else
  res.send(adsID);
});

router.get('/byPaciente', methods.ensureToken, async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await citaCollection.getcitaByPaciente(req.query.id_paciente);
  if (!adsID)  res.status(404).json({"message": "cita not found"});
  else
  res.send(adsID);
});

router.get('/byConsultorio', methods.ensureToken, async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await citaCollection.getCitasByConsultorio(req.query.id);
  if (!adsID)  res.status(404).json({"message": "cita not found"});
  else
  res.send(adsID);
});

router.post('/', methods.ensureToken, async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await citaCollection.insertCita(newAd, res);
});

router.delete('/', methods.ensureToken, async function(req, res) {
  await citaCollection.deleteCita(req.query.id, res);
});

router.put('/', methods.ensureToken, async function(req, res) {
  const updatedAd = req.body;
  await citaCollection.updateCita(req.query.id, updatedAd, res);
});

module.exports = router;
