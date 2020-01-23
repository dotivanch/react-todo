const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.connect('mongodb+srv://todo:2EOzPBCLmlfkmSGZ@aps-rl4e8.mongodb.net/test?retryWrites=true&w=majority');