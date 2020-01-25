const express = require('express');

module.exports = (server) => {
    const api = express.Router();
    const auth = require('./models/Auth/auth');
    server.use('/api', api);

    /*
     * Task
     */
    const taskController = require('./models/Task/taskController');
    api.route('/task/:creator')
        .get(auth.verify, taskController.getAll)
        .post(auth.verify, taskController.create);
    
    api.route('/task/:taskId')
        .put(auth.verify, taskController.update)
        .patch(auth.verify, taskController.update)
        .delete(auth.verify, taskController.delete);
    
    api.get('/task/id/:taskId', taskController.getById);

    /*
     * User
     */
    const userController = require('./models/User/userController');
    api.post('/user/register', userController.create);
    api.post('/user/login', userController.login);
    api.post('/user/auth', userController.authenticate);


    /*
     *  Error handling
     */
    api.use( function (err, req, res, next) {
        if(err.name === 'MongoError'){
            return res.status(400).send(err);
        }

        next(err);
    });

}
