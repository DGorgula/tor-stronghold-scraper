const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { SERVER_USERNAME, SERVER_PASSWORD } = process.env;
mongoose.connect(`mongodb://${SERVER_USERNAME}:${SERVER_PASSWORD}@errordb:27017/errorkingdom`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
});

const errorSchema = new Schema({
    source: {
        type: String,
        default: "Server"
    },
    name: {
        type: String,
        default: 'ServerError'
    },
    stack: String,
    date: {
        type: Date,
        default: new Date()
    },
    message: {
        type: String,
        default: null
    }
});


module.exports.Error = new mongoose.model('Error', errorSchema);