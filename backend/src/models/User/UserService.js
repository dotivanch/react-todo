const User = require('./User');

const hash = (data) => (require('crypto').createHash('sha1').update(data).digest('base64'));

function hash_password(req, res, next) {
    req.body.password = hash(req.body.password);
    next();
}

User.methods(['get', 'post', 'put', 'delete']);
User.before('post', hash_password).before('put', hash_password);
User.updateOptions({new: true, runValidators: true});

module.exports = User