const express = require('express')
const app = express();
const { Paste } = require('./mongo');
const port = process.env.PORT || 3005;


app.get('/', (req, res) => {
    return Paste.find().sort({ 'createdAt': -1 })
        .then(data => res.json(data))
        .catch(console.log)
});

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log("connected successfuly to port " + port)
})