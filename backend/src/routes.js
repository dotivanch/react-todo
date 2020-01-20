const express = require('express')

module.exports = (server) => {
    const api = express.Router()
    server.use('/api', api)

    const taskService = require('./models/TaskService');
    taskService.register(api, '/task')
}
