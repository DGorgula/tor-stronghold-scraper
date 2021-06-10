const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { dataSchema } = require('./schemas/dataSchema');
const { pasteSchema } = require('./schemas/pasteSchema');
const { SCRAPER_USERNAME, SCRAPER_PASSWORD } = process.env;

mongoose.connect(`mongodb://${SCRAPER_USERNAME}:${SCRAPER_PASSWORD}@mongo:27017/stronghold`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
});

module.exports.PasteData = new mongoose.model('PasteData', dataSchema);;
module.exports.Paste = new mongoose.model('Paste', pasteSchema);
module.exports.mongoose = mongoose