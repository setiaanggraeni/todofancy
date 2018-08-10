const Task = require('../models/tasks')
const jwt = require('jsonwebtoken')

class TaskController {
    static create(req, res){
        let token = req.headers.token
        var {task, dueDate} = req.body
        let decoded = jwt.verify(token, process.env.secretKey)
        let id = decoded.id
        Task.create({
            task, dueDate, userId: id
        })
        .then(task => {
            res.status(200).json(task)
        })
        .catch(err => {
            console.log('ini error',err);
            res.status(400).json(err)
        })
    }

    static tasks(req, res){
        let token = req.headers.token
        let decoded = jwt.verify(token, process.env.secretKey)
        let theTasks = []
        Task.find({})
        .populate('userId')
        .then(allTasks => {
            allTasks.forEach(task => {
                if(task.userId._id == decoded.id){
                    theTasks.push(task)
                }
            })
            // console.log('tasknya', theTasks);
            res.status(200).json({
                msg: 'Here are the all tasks',
                theTasks
            })
        })
        .catch(err => {
            res.status(403).json({
                msg: 'You have no access!',
                err
            })
        })
    }

    static getOneTask(req, res){
        let token = req.headers.token
        let decoded = jwt.verify(token, process.env.secretKey)
        let id = req.params.id
        Task.find({_id : id})
        .then(task => {
            if(task[0].userId == decoded.id){
                res.status(200).json({
                    msg: 'Here is the tasks',
                    task
                })
            } else {
                res.status(403).json('You have no access!')
            }
        })
        .catch(err => {
            res.status(403).json({
                msg: `Task id ${id} not found!`,
                err
            })
        })
    }

    static edit(req, res){
        let token = req.headers.token
        let taskId = req.params.id
        var {task, dueDate, status} = req.body
        let decoded = jwt.verify(token, process.env.secretKey)
        if(task.length !== 0 && dueDate.length !== 0 && status.length !== 0){
            Task.findOne({_id : taskId})
            .then(theTask => {
                if(theTask.userId == decoded.id){
                    Task.update({_id: taskId}, { $set: {
                        task, dueDate, status
                    }})
                    .then(updatedTask => {
                        res.status(200).json({
                            msg: `Successfully edit task id ${taskId}`,
                            updatedTask
                        })
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
                } else {
                    res.status(403).json('You have no access')
                }
            })
            .catch(err => {
                res.status(400).json({
                    msg: `Task id ${taskId} not found!`,
                    err
                })
            })
        } else {
            res.status(400).json('Please fill in correctly! Required!')
        }  
    }


    static deleteTask(req, res){
        let token = req.headers.token
        let taskId = req.params.id
        let decoded = jwt.verify(token, process.env.secretKey)
        Task.findOne({_id : taskId})
        .then(theTask => {
            if(theTask.userId == decoded.id){
                Task.deleteOne({_id: taskId})
                .then(deletedTask => {
                    res.status(200).json({
                        msg: `Successfully delete task id ${taskId}`,
                        deletedTask
                    })
                })
                .catch(err => {
                    res.status(400).json(err)
                })
            } else {
                res.status(403).json('You have no access')
            }
        })
        .catch(err => {
            res.status(400).json({
                msg: `Task id ${taskId} not found!`,
                err
            })
        })
    }
}

module.exports = TaskController