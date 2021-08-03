const { Schema } = require('mongoose');
module.exports.labelAverageSchema = new Schema({
    label: String,
    count: Number,
    score: {
        type: Number,
        default: 0
    },
});