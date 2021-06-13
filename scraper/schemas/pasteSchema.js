const { Schema } = require('mongoose');
module.exports.pasteSchema = new Schema({
    title: String,
    content: Array,
    date: Date,
    author: String,
    views: Number,
    labels: {
        type: Array,
    }
});