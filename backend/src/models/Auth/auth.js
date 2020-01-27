const jwt = require('jsonwebtoken');

module.exports = {
    isValid(token) {      
        return new Promise( function(resolve, reject) {
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if(err) reject(err);
                else {
                    resolve(decoded);
                }
            });
        });
    },

    verify(req, res, next) {
        if(!req.headers['authorization'])
            return res.status(401).send({auth: false, message: 'No token provided'});
        
        var [user, token] = req.headers['authorization'].split(' ');
        
        if(!token)
            return res.status(401).send({auth: false, message: 'No token provided'});
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if(err || decoded.id !== user)
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            
            req.userId = decoded.id;
            next();
        });
    }
}
