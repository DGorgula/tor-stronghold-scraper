const mongoose = require('mongoose');
const { Schema } = require('mongoose');
mongoose.connect('mongodb://mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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