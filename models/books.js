const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    summary:{
        type: String,
        require: true
    }
});

const Books = module.exports = mongoose.model('Books', bookSchema);