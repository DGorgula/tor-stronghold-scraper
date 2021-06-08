const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { SERVER_USERNAME, SERVER_PASSWORD } = process.env;
console.log("SERVER: ", SERVER_USERNAME, SERVER_PASSWORD);
mongoose.connect('mongodb://theserver:theserverpassword@mongo:27017/stronghold', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
});

const pasteSchema = new Schema({
    title: String,
    content: Array,
    createdAt: Date,
    createdBy: String
});


module.exports.Paste = new mongoose.model('Paste', pasteSchema);
module.exports.mongoose = mongoose