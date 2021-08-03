const { Schema } = require('mongoose');
const { scoredLabelsSchema } = require('./scoredLabelsSchema');
module.exports.dataSchema = new Schema({
    pasteId: Schema.Types.ObjectId,
    entities: Array,
    labels: [scoredLabelsSchema],
    date: {
        type: Date,
        default: new Date()
    }
});
