var express = require('express');
var router = express.Router();
const {insertAd, getAds} = require('../src/database/collections/asd/asd');
const {deleteAd, updateAd, getAdsbyID} = require('../src/database/collections/asd/asd');
var methods = require("../src/auth/method")



/* GET users listing. */
router.get('/',  methods.ensureToken, async function(req, res, next) {
  var allusr = await getAds()
  // console.log(allusr)
  res.send(allusr);
});

router.get('/byId', async function(req, res) {
  // console.log('id a consultar', req.query.id)
  var adsID = await getAdsbyID(req.query.id);
  if (!adsID)  res.status(404).json({"message": "user not found"});
  else
  res.send(adsID);
});

router.post('/', async function(req, res, next) {
  // res.send(insert());
  const newAd = req.body;
  console.log(req.body)
  await insertAd(newAd, res);
  res.send({ message: 'New user inserted.' });
});

router.delete('/', async function(req, res) {
  await deleteAd(req.query.id, res);
  // res.send({ message: 'Ad removed.' });
});

router.put('/', async function(req, res) {
  const updatedAd = req.body;
  await updateAd(req.query.id, updatedAd, res);
  // res.send({ message: 'Ad updated.' });
});


async function insert(){
  var intsertered = await insertAd({title: 'Hello, now from the in-memory database!'});

  if (intsertered) {
   console.log(intsertered) 
  //  return '200'
  }
}



module.exports = router;
