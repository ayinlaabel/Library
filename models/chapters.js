const mongoose = require('mongoose');


const chapterSchema = mongoose.Schema({
    ids:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
    }
});

const Chapter = module.exports = mongoose.model('Chapter', chapterSchema);