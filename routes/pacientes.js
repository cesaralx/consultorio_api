var express = require('express');
var router = express.Router();
const paciColl = require('../src/database/collections/pacientes/paciente');
var methods = require("../src/auth/method")


router.get('/', async function(req, res, next) {
  var allusr = await paciColl.getPacientes()
  // console.log(allusr)
  res.send(allusr);
});

// get por id
router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await paciColl.getPacienteByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "paciente not found"});
  else
  res.send(adsID);
});

router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await paciColl.insertPaciente(newAd, res);
});

router.delete('/', async function(req, res) {
  await paciColl.deletePaciente(req.query.id, res);
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await paciColl.updatePaciente(req.query.id, updatedAd, res);
});

module.exports = router;
