var express = require('express');
var router = express.Router();
const {insertUsr, getUsrs, getUsrByID, deleteUsr, updateUsr, getUsrByUser} = require('../src/database/collections/users/user');
var methods = require("../src/auth/method")
var common_user = require('../src/common/recover_user')

router.get('/',  methods.ensureToken, async function(req, res, next) {
  var allusr = await getUsrs()
  // console.log(allusr)
  res.send(allusr);
});

router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await getUsrByID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "Problemas con el servidor"});
  else
  res.send(adsID);
});

router.get('/byUsr', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await getUsrByUser(req.query.user);
  if (!adsID)  res.status(404).json({"message": "user not found"});
  else
  res.send(adsID);
});

router.post('/recUsr', async function(req, res) {
  var adsID = await common_user.mail(req.body.id);
  // console.log('id a consultar', req.body.id)
  if (!adsID)  res.status(404).json({"message": "user not found"});
  else
  res.send({message: 'email succesfully sended'});
});

router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(res.body)
  await insertUsr(newAd, res);
});

router.delete('/', async function(req, res) {
  await deleteUsr(req.query.id, res);
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await updateUsr(req.query.id, updatedAd, res);
});

module.exports = router;
