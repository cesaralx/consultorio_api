var express = require('express');
var router = express.Router();
const visitaColl = require('../src/database/collections/visita_med/visitaMed');
var methods = require("../src/auth/method")


router.get('/', methods.ensureToken, async function(req, res, next) {
  var allusr = await visitaColl.getVisMeds()
  // console.log(allusr)
  res.send(allusr);
});

// get por id
router.get('/byId', methods.ensureToken, async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await visitaColl.getVisMedByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "visita not found"});
  else
  res.send(adsID);
});

// get por cita
router.get('/byCita', methods.ensureToken, async function(req, res) { 
    // console.log('id a consultar', req.query.id)
    var adsID = await visitaColl.getVisMedByCita(req.query.id);
    if (!adsID)  res.status(404).json({"message": "visita not found"});
    else
    res.send(adsID);
  });

//   get por paciente
router.get('/byPaci', methods.ensureToken, async function(req, res) {
// console.log('id a consultar', req.query.id)
var adsID = await visitaColl.getVisMedBypaci(req.query.id);
if (!adsID)  res.status(404).json({"message": "visita not found"});
else
res.send(adsID);
});

// get por consultorio
router.get('/byConsul', methods.ensureToken, async function(req, res) {
// console.log('id a consultar', req.query.id)
var adsID = await visitaColl.getVisMedByconsul(req.query.id);
if (!adsID)  res.status(404).json({"message": "visita not found"});
else
res.send(adsID);
});
  

router.post('/', methods.ensureToken, async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await visitaColl.insertVisMed(newAd, res);
});

router.delete('/', methods.ensureToken, async function(req, res) {
  await visitaColl.deleteVisMed(req.query.id, res);
});

router.put('/', methods.ensureToken, async function(req, res) {
  const updatedAd = req.body;
  await visitaColl.updateVisMed(req.query.id, updatedAd, res);
});

module.exports = router;
