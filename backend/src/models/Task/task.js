const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    state: { type: String, default: 'unfinished'},
    priority: { type: Number, default: 0 },
    date: {type: String, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema)
