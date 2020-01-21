const restful = require('node-restful');
const mongoose = restful.mongoose;

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: String, default: 'UNFINISHED'},
    deadline: { type: String, required: true },
    priority: { type: Number, default: 0 },
    date: {type: String, default: Date.now }
});

module.exports = restful.model('Task', TaskSchema)
