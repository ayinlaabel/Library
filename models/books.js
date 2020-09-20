const mongoose = require('mongoose');
const Chapter = require('./chapters');
const chapterSchema = mongoose.model('Chapter').schema;


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
    },
    chapter:[chapterSchema]
});

const Book = module.exports = mongoose.model('Book', bookSchema);