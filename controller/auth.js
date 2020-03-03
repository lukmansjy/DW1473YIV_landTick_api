const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { secretKey } = require('../config/secretKey')

const Model = require('../models')
const User = Model.user
// const TypeTrains = Model.typeTrain

exports.login = (req, res)=>{
    const {username, password}= req.body
    console.log(username, password);

    User.findOne({where: {username: username}}).then(user => {
        if(user){
            // compare bcrypt password
            bcrypt.compare(password, user.password, function(err, resBcrypt) {
                if(resBcrypt) {
                    const token = jwt.sign({userId: user.id, admin: user.admin}, secretKey)
                    res.send({
                        username: user.username,
                        message: "success",
                        status: user.status,
                        token: token,
                        admin: user.admin
                    })
                } else {
                    res.status(401).send({
                        error: true,
                        message: "Wrong Password!"
                    })
                } 
            });
        }else{
            res.status(401).send({
                error: true,
                message: "Wrong Username or Password!"
            })
        }
    })
}


exports.register = (req, res)=>{
    console.log(req.body)
    const body = req.body
    User.findOne({where: {email: body.email}}).then( data => {
        if(data == null){
            bcrypt.hash(body.password, 10, function(err, hash) {
                if(!err){
                    const userData = {
                        name: body.name,
                        username: body.username,
                        email: body.email,
                        password: hash,
                        gender: body.gender,
                        phone: body.phone,
                        address: body.address,
                        status: 0,
                        admin: 0
                    }
                    User.create(userData).then( user => {
                        if(user){
                            const token = jwt.sign({userId: user.id, admin: user.admin}, secretKey)
                            res.send({
                                message: "success",
                                token: token,
                                admin: user.admin
                            })
                        }else{
                            res.status(400).send({
                                error: true,
                                message: "System register user error"
                            })
                        }
                    })
                }else{
                    res.status(400).send({
                        error: true,
                        message: "Bcrypt error"
                    })
                }
            });
        }else{
            res.status(401).send({
                error: true,
                message: "Email sudah terdaftar"
            })
        }
    })
}