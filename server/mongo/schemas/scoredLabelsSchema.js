const { Schema } = require('mongoose');
module.exports.scoredLabelsSchema = new Schema({
    label: String,
    score: {
        type: Number,
        default: 0
    }
});