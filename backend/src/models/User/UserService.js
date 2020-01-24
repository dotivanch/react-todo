const User = require('./User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

// https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d

module.exports = {
    create: (req, res, next) => {
        User.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            active: true
        });
        res.status(201)
        .json({status: 'Account created'});
    },

    authenticate: (req, res, next) => {
        User.findOne({username: req.body.username}, (err, info) => {
            if(err) {
                res.status(404)
                .json({status: 'Account not found'});
            }else{
                if(bcrypt.compareSync(req.body.password, info.password)){
                    const token = jwt.sign(
                        { id: info.username },
                        req.app.get('secretKey'),
                        { expiresIn: '1h' }
                    );
                    res.status(200)
                    .json({ token: token });
                }
            }
        })
    }
};