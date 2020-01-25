const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const saltRounds    = 10;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: true }
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
}, function (err) {
    next(err);
});

module.exports = mongoose.model('User', UserSchema);