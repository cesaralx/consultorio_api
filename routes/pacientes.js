var express = require('express');
var router = express.Router();
const paciColl = require('../src/database/collections/pacientes/paciente');
var methods = require("../src/auth/method")
var common_paci = require('../src/common/recover_paciente')


router.get('/', methods.ensureToken, async function(req, res, next) {
  var allusr = await paciColl.getPacientes()
  // console.log(allusr)
  res.send(allusr);
});

// get por id
router.get('/byId', methods.ensureToken, async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await paciColl.getPacienteByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "paciente not found"});
  else
  res.send(adsID);
});

router.get('/byUsr', methods.ensureToken, async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await paciColl.getPacienteByUser(req.query.user);
  if (!adsID)  res.status(404).json({"message": "user not found"});
  else
  res.send(adsID);
});

router.post('/recPas', async function(req, res) {
    console.log('id a consultar', req.body.id)
  var adsID = await common_paci.mail(req.body.id);
  if (!adsID)  res.status(404).json({"message": "user not found"});
  else
  res.send({message: 'email succesfully sended'});
});

router.post('/', methods.ensureToken, async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  // console.log(req.body)
  await paciColl.insertPaciente(newAd, res);
  
});

router.delete('/', methods.ensureToken, async function(req, res) {
  await paciColl.deletePaciente(req.query.id, res);
});

router.put('/', methods.ensureToken, async function(req, res) {
  const updatedAd = req.body;
  await paciColl.updatePaciente(req.query.id, updatedAd, res);
});

module.exports = router;
