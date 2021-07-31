const { pasteSchema } = require('./pasteSchema');
const { Schema } = require('mongoose');
const { scoredLabelsSchema } = require('./scoredLabelsSchema');
const { labelAverageSchema } = require('./labelAverageSchema');
const { entitySchema } = require('./entitySchema');
module.exports.generalSchema = new Schema({
    analysisCount: {
        type: Number,
        default: 0
    },
    allEntities: [entitySchema],
    // entitiesSum: entitySum,
    highestLabelScores: [scoredLabelsSchema],
    lowestLabelScores: [scoredLabelsSchema],
    labelAverage: [scoredLabelsSchema],
    currentLabels: {
        type: Array,
        of: String,
        default: ["children", "business", "government", "other"]
    },
    labelsHistory: {
        type: Array,
        of: Array
    },
    mostViewed: [pasteSchema],
    analysisStartingDate: {
        type: Date,
        default: new Date()
    }
});
