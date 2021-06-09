const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const { SERVER_USERNAME, SERVER_PASSWORD, NLP_CLOUD_TOKEN } = process.env;


mongoose.connect(`mongodb://${SERVER_USERNAME}:${SERVER_PASSWORD}@mongo:27017/analysis`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
});

// const generalSchema = new Schema({
//     pasteId: String,
//     entities: Array,
//     createdAt: Date,
// });



// module.exports.General = new mongoose.model('General', generalSchema);