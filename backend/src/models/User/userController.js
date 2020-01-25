const userModel = require('./user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const auth = require('../Auth/auth');

// https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d

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
                next(err);
            }else{
                if(bcrypt.compareSync(req.body.password, info.password)){
                    const token = jwt.sign(
                        { id: info.username },
                        'arma secreta',
                        { expiresIn: '1h' }
                    );
                    res.status(200)
                    .json({
                        token: token,
                        username: info.username,
                        name: info.name
                    });
                }else{
                    next(err);
                }
            }
        })
    },

    authenticate: (req, res, next) => {
        userModel.findOne({username: req.body.username}, (err, info) => {
            if(!info) {
                next(err);
            }else{
                if(auth.isValid(req.body.token)){
                    res.status(200).end();
                }
            }
        })
    }
};