const { Schema } = require('mongoose');
module.exports.dataSchema = new Schema({
    pasteId: String,
    entities: Array,
    createdAt: Date,
});
