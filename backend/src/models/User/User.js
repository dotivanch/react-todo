const restful = require('node-restful');
const mongoose = restful.mongoose;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: true }
});

module.exports = restful.model('User', UserSchema)
