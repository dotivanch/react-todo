const userModel = require('./user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const auth = require('../Auth/auth');

module.exports = {
    create: (req, res, next) => {
        userModel.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name
        }, (err, response) => {
            if(err){
                next(err);
            }else{
                res.status(201)
                .json({message: 'Account created', data: response});
            }
        });
    },

    login: (req, res, next) => {
        userModel.findOne({username: req.body.username}, (err, info) => {
            if(!info) {
                res.status(401).json({message: 'Wrong username/password.'});
            }else{
                if(bcrypt.compareSync(req.body.password, info.password)){
                    const token = jwt.sign(
                        { id: info.username },
                        process.env.SECRET,
                        { expiresIn: '2h' }
                    );
                    res.status(200)
                    .json({
                        token: token,
                        username: info.username,
                        name: info.name
                    });
                }else{
                    res.status(401).json({message: 'Wrong username/password.'});
                }
            }
        })
    },

    authenticate: (req, res, next) => {
        userModel.findOne({username: req.body.username}, (err, info) => {
            if(!info) {
                next(err);
            }else{
                auth.isValid(req.body.token).then(function(decoded) {
                    res.status(200).end();
                }).catch( function(err) {
                    res.status(401).end();
                });
            }
        })
    }
};