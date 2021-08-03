const { Schema } = require('mongoose');
module.exports.entitySchema = new Schema({
    count: {
        type: Number,
        default: 0
    },
    text: String
});

