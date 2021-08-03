const { Schema } = require('mongoose');
module.exports.scoredLabelsSchema = new Schema({
    type: String,
    label: String,
    score: {
        type: Number,
        default: 0
    }
});