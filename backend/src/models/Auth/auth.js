const jwt = require('jsonwebtoken');

module.exports = {
    isValid(token) {
        if(!token) return false;
        
        jwt.verify(token, 'arma secreta', function(err, decoded) {
            if(err) return false;
        });

        return true;
    },

    verify(req, res, next) {
        var [user, token] = req.headers['authorization'].split(' ');
        if(!token)
            return res.status(401).send({auth: false, message: 'No token provided'});
        
        jwt.verify(token, 'arma secreta', function(err, decoded) {
            if(err || decoded.id !== user){
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            
            req.userId = decoded.id;
            next();
        });
    }
}
