var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")


const username = "one"
const password = "123456"

router.post('/',(req, res, next) => {
 let p_username = req.body.username
 let p_password = req.body.password

if(p_username == username && p_password == password){
    var token = jwt.sign(
    { username: username }, 
    process.env.SKEY ,{expiresIn: '8h'}, //tiempo de expiracion de 8 horas
    (err, token) => {
        res.send({
        ok: true,
        message: "Login successful",
        token: token
        })
    })
 } else {
    res.send({
    ok: false,
    message: "Username or password incorrect"
    })
    }
});


module.exports = router;
