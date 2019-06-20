var express = require('express');
var router = express.Router();
const visitaColl = require('../src/database/collections/visita_med/visitaMed');
var methods = require("../src/auth/method")


router.get('/', async function(req, res, next) {
  var allusr = await visitaColl.getVisMeds()
  // console.log(allusr)
  res.send(allusr);
});

// get por id
router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await visitaColl.getVisMedByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "visita not found"});
  else
  res.send(adsID);
});

// get por cita
router.get('/byCita', async function(req, res) { 
    // console.log('id a consultar', req.query.id)
    var adsID = await visitaColl.getVisMedByCita(req.query.id);
    if (!adsID)  res.status(404).json({"message": "visita not found"});
    else
    res.send(adsID);
  });

//   get por paciente
router.get('/byPaci', async function(req, res) {
// console.log('id a consultar', req.query.id)
var adsID = await visitaColl.getVisMedBypaci(req.query.id);
if (!adsID)  res.status(404).json({"message": "visita not found"});
else
res.send(adsID);
});

// get por consultorio
router.get('/byConsul', async function(req, res) {
// console.log('id a consultar', req.query.id)
var adsID = await visitaColl.getVisMedByconsul(req.query.id);
if (!adsID)  res.status(404).json({"message": "visita not found"});
else
res.send(adsID);
});
  

router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await visitaColl.insertVisMed(newAd, res);
});

router.delete('/', async function(req, res) {
  await visitaColl.deleteVisMed(req.query.id, res);
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await visitaColl.updateVisMed(req.query.id, updatedAd, res);
});

module.exports = router;
