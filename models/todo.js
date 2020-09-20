const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    userId: {
        type:String,
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    isComplete: {
        type: Boolean
    }
})

const Todo = module.exports = mongoose.model('Todo', todoSchema)