var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
const {userModel} = require('../src/database/collections/users/userSchema') //import from model schema
const {pacienteModel} = require('../src/database/collections/pacientes/pacienteSchema') //import from model schema


// const username = "cesaral"
// const password = "123456"

async function userExists(usr, pwd) {
  return await userModel.findOne({usuario: usr, password: pwd})
}

async function externalUsrExists(usr, pwd) {
  return await pacienteModel.findOne({"login.usuario": usr, "login.password": pwd})
}


router.post('/',async (req, res, next) => {

 let p_username = req.body.username
 let p_password = req.body.password
 let exists = await userExists(p_username, p_password)
 let existsExternal = await externalUsrExists(p_username, p_password)

 if ( !exists && !existsExternal ){
    res.send({
    ok: false,
    message: "Username or password incorrect"
    })
    } else {
      if (exists){
        jwt.sign(
          { username: p_username }, 
          process.env.SKEY ,{expiresIn: '8h'}, //tiempo de expiracion de 8 horas
          (err, token) => {
              res.send({
              ok: true,
              type: "user",
              message: "Login successful",
              token: token
              })
          })
      } 
      if (existsExternal) {
        jwt.sign(
          { username: p_username }, 
          process.env.SKEY ,{expiresIn: '2h'}, //tiempo de expiracion de 8 horas
          (err, token) => {
              res.send({
              ok: true,
              type: "paciente",
              message: "Login successful",
              token: token
              })
          })
      }
    // jwt.sign(
    // { username: p_username }, 
    // process.env.SKEY ,{expiresIn: '8h'}, //tiempo de expiracion de 8 horas
    // (err, token) => {
    //     res.send({
    //     ok: true,
    //     type: "user",
    //     message: "Login successful",
    //     token: token
    //     })
    // })
 }  
});


module.exports = router;
