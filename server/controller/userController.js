const mongoose = require('mongoose')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res){
        var {name, email} = req.body
        var salt = bcrypt.genSaltSync(8)
        var hash = bcrypt.hashSync(req.body.password, salt)
        User.findOne({email: email})
        .then(user => {
            if(!user){
                User.create({
                    name, email, password: hash
                })
                .then(user => {
                    res.status(200).json({
                        msg: 'Sucessfully registered!',
                        user})
                })
                .catch(err => {
                    res.status(400).json({
                        msg: 'Register failed',
                        err
                    })
                })
            } else {
                res.status(400).json({msg: 'Email already exist!'})
            }
        })
    }

    static login(req, res){
        var {email, password} = req.body
        User.findOne({email : email})
        .then(user => {
            if(user){
                let compare = bcrypt.compareSync(password, user.password)              
                if(compare){
                    jwt.sign({id: user._id, name: user.name}, process.env.secretKey, (err, token) => {
                        if(err) res.status(401).json('Failed to sign token')
                        res.status(200).json({
                            msg: 'Successfully login!',
                            token,
                            name: user.name
                        })
                    })
                }  else {
                    res.status(401).json('Login failed, please check your email/password!')
                }
            } else {
                res.status(401).json('Wrong email/password')
            }
        })
    }
}

module.exports = UserController