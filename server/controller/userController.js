const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
var nodemailer = require('nodemailer')

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
                        res.status(201).json({
                            msg: 'Successfully login!',
                            token,
                            name: user.name
                        })
                    })
                } else {
                    res.status(401).json('Login failed, please check your email/password!')
                }
            } else {
                res.status(401).json('Wrong email/password')
            }
        })
    }

    static loginFb(req, res){
        let urlUserInfo = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.fbToken}`
        axios({
            method: 'post',
            url: urlUserInfo,
            data:{}
        })
        .then(response => {
            var salt = bcrypt.genSaltSync(8)
            var hash = bcrypt.hashSync(response.data.id, salt)
            User.findOne({email: response.data.email})
            .then(user => {
                if(!user){
                    User.create({
                        name: response.data.name,
                        email: response.data.email,
                        password: hash
                    })
                    .then(user => {
                        res.status(200).json({
                            msg: 'Sucessfully registered!',
                            user,
                            token: req.body.fbToken
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            msg: 'Register failed',
                            err
                        })
                    })
                } else {
                    let compare = bcrypt.compareSync(response.data.id, user.password)
                    if(compare){
                        jwt.sign({id: user._id, name: user.name}, process.env.secretKey, (err, token) => {
                            if(err) res.status(401).json('Failed to sign token')
                            res.status(201).json({
                                msg: 'Successfully login!',
                                token,
                                name: user.name
                            })
                        })
                    } else {
                        res.status(401).json('Login failed, please check your email/password!')
                    }
                }
            })
            .catch(err => {
                res.status(400).json({
                    msg: 'login with fb error'
                })
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'fb error'
            })
        })
    }

    static sendMail(req, res){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.email}`,
              pass: `${process.env.emailpass}`
            }
        })
          
        var allDeadline = req.body.yourDeadline
        var dealines = []
        allDeadline.forEach(element => {
            dealines.push({Task: element.task, Deadline: element.dueDate.slice(0,10)})
        })
        var mailOptions = {
            from: `${process.env.email}`,
            to: `${req.body.email}`,
            subject: 'Todo Fancy Setia Anggraeni',
            text: `${JSON.stringify(dealines)}`
        }
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).json(error.message)
            } else {
                res.status(200).json(info.response)
            }
        })
    }
    
}

module.exports = UserController