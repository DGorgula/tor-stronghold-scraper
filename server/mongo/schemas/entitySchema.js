const { Schema } = require('mongoose');
module.exports.entitySchema = new Schema({
    type: String,
    text: String
});

