const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Posting = require('../models/postings')
require('dotenv').config()
module.exports = {
    create(req, res) {
        Users
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                watchedTag: req.tags
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                let path = Object.keys(err.errors)
                res.status(400).json({ error: err.errors[path[0]].message.slice(0, err.errors[path[0]].message.length - 1) })
            })
    },
    login(req, res) {
        let user = ''
        Users
            .findOne({
                email: req.body.email
            })
            .populate('watchedTag')
            .then(userLogin => {
                if (userLogin) {
                    user = userLogin
                    return bcrypt.compare(req.body.password, userLogin.password)
                        .then(response => {
                            if (response) {
                                console.log(user, "================");

                                res.status(200).json({
                                    user: user,
                                    token: jwt.sign({
                                        id: user._id,
                                        email: user.email,
                                        role: user.role,
                                        name: user.name
                                    }, process.env.JWTTOKEN)
                                })
                            } else {
                                res.status(400).json({ error: 'password wrong' })
                            }
                        })
                } else {
                    res.status(400).json({ error: 'email wrong' })
                }
            })
            .catch(err => {
                console.log(err);

                res.status(500).json({ error: err })
            })
    },
    addWatchedTag(req, res) {
        console.log(req.body.tags);

        Users
            .findById(req.user)
            .then(user => {
                if (user) {
                    console.log(user.watchedTag, "==watched tag");
                    if (user.watchedTag.length == 0) {
                        user.watchedTag.push(req.body.tags)
                    } else {
                        let cek = false
                        user.watchedTag.forEach(tag => {
                            if (req.body.tags == tag) {
                                cek = true
                            }
                        })
                        if (!cek) {
                            user.watchedTag.push(req.body.tags)
                        }
                    }
                    return user.save()
                }
            })
            .then(user => {
                return Users
                    .findById(req.user)
                    .populate('watchedTag')
            })
            .then(user => {
                res.status(200).json({ tags: user.watchedTag })
            })
            .catch(err => {
                console.log(err, "====");

                res.status(500).json(err)
            })
    },
    getUserTag(req, res) {
        Users
            .findById(req.user)
            .populate('watchedTag')
            .then(user => {
                console.log(user, "========");
                
                res.status(200).json({ tag: user.watchedTag })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    updateTag(req, res) {
        console.log(req.tags, "======");
        
        Users
            .findOneAndUpdate({
                _id: req.user
            }, { $set: { watchedTag: req.tags } }, { new: true 
            })
            .then(user => {
                
                
               return Users
                    .findById(user._id)
                    .populate('watchedTag')
            })
            .then(user => {
                console.log(user);
                let promises = [] 
                user.watchedTag.forEach(e => {

                    promises.push(Posting
                        .find({tags : e._id})
                        .populate('tags')
                        .populate('user'))
                })
                return Promise.all(promises)
            })
            .then(data => {
                console.log(data.length, "====ini data====");
                
                // console.log("data promis", JSON.stringify(data));
                
                let suggestionPosting = []
                data.forEach(e => {
                    e.forEach(tag => {
                        if(tag) {

                            suggestionPosting.push(tag)
                        }
                    })
                })

                // console.log(suggestionPosting, "=====");
                
                res.status(200).json(suggestionPosting)
                // console.log(data);      
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json(err)
            })

    }


}