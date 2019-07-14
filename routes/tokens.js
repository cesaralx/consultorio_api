var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
const {userModel} = require('../src/database/collections/users/userSchema') //import from model schema


// const username = "cesaral"
// const password = "123456"

async function userExists(usr, pwd) {
  return await userModel.findOne({usuario: usr, password: pwd})
}


router.post('/',async (req, res, next) => {

 let p_username = req.body.username
 let p_password = req.body.password
 let exists = await userExists(p_username, p_password)

 if (!exists){
    res.send({
    ok: false,
    message: "Username or password incorrect"
    })
    } else {
    var token = jwt.sign(
    { username: p_username }, 
    process.env.SKEY ,{expiresIn: '8h'}, //tiempo de expiracion de 8 horas
    (err, token) => {
        res.send({
        ok: true,
        message: "Login successful",
        token: token
        })
    })
 }  
});


module.exports = router;
