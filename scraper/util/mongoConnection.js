const mongoose = require('mongoose');
const { dataSchema } = require('../schemas/dataSchema');
const { entitySchema } = require('../schemas/entitySchema');
const { generalSchema } = require('../schemas/generalDataSchema');
const { pasteSchema } = require('../schemas/pasteSchema');
const { scoredLabelsSchema } = require('../schemas/scoredLabelsSchema');
const { SCRAPER_USERNAME, SCRAPER_PASSWORD } = process.env;

mongoose.connect(`mongodb://${SCRAPER_USERNAME}:${SCRAPER_PASSWORD}@mongo:27017/stronghold`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
});

module.exports.PasteData = new mongoose.model('PasteData', dataSchema);
module.exports.GeneralData = new mongoose.model('GeneralData', generalSchema);
module.exports.Paste = new mongoose.model('Paste', pasteSchema);
module.exports.Label = new mongoose.model('Label', scoredLabelsSchema);
module.exports.Entity = new mongoose.model('Entity', entitySchema);
module.exports.mongoose = mongoose