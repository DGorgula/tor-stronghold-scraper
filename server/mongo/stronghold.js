const mongoose = require('mongoose');
const pasteSchema = require('./schemas/pasteSchema');
const dataSchema = require('./schemas/dataSchema');
const { generalSchema } = require('./schemas/generalDataSchema');
const { SERVER_USERNAME, SERVER_PASSWORD } = process.env;

const stronghold = mongoose.createConnection(`mongodb://${SERVER_USERNAME}:${SERVER_PASSWORD}@mongo:27017/stronghold`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, conn) => {
    if (err) throw err;
    console.log("connected to mongodb");
});

// const analysis = mongoose.createConnection(`mongodb://${ANALYSIS_USERNAME}1:${ANALYSIS_PASSWORD}@mongo:27017/analysis`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) throw err;
//     console.log("connected to mongodb");
// });

//     mongoose.connect(`mongodb://${SERVER_USERNAME}:${SERVER_PASSWORD}@mongo:27017/stronghold`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) throw err;
//     console.log("connected to mongodb");
// });


// const PasteData = analysis.model('PasteData', dataSchema);

module.exports.GeneralData = stronghold.model('GeneralData', generalSchema);;
module.exports.Paste = stronghold.model('Paste', pasteSchema);
module.exports.PasteData = stronghold.model('PasteData', dataSchema);;

// PasteData.create({
//     pasteId: "String",
//     entities: ["Array", "sfdg"],
//     createdAt: new Date(),
// })