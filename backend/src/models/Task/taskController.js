const taskModel = require('./task');

module.exports = {
    create: (req, res, next) => {
        taskModel.create({...req.body, creator: req.params.creator}).then(task => {
            res.status(201)
            .send(task);
        });
    },

    getById: (req, res, next) => {
        taskModel.findById({_id: req.params.taskId}, (err, response) => {
            if(err){
                next(err);
            }else{
                res.status(200)
                .send(response);
            }
        });
    },

    getAll: (req, res, next) => {
        taskModel.find({creator: req.params.creator}, (err, response) => {
            let list = [];
            if(err){
                next(err);
            }else{
                response.forEach(x => {
                    list.push(x);
                });

                res.send(list)
                .status(200);
            }
        });
    },

    update: (req, res, next) => {
        taskModel.findByIdAndUpdate(req.params.taskId, req.body, (err, response) => {
            if(err){
                next(err);
            }else{
                res.status(200)
                .send({message: 'Task updated'});
            }
        });
    },

    delete: (req, res, next) => {
        taskModel.findByIdAndDelete(req.params.taskId, ((err, response) => {
            if(err){
                next(err);
            }else{
                res.status(200)
                .send('Task deleted');
            }
        }));
    }
};