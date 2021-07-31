require('dotenv').config();
const { getData } = require('./mongo/util');
const express = require('express')
const app = express();
// const { General } = require('./mongo/analysis');
const cors = require('cors');
const port = process.env.PORT || 3005;

app.use(cors())

// TODO: try to create changestream for realtime data
app.get('/all', async (req, res, next) => {
    console.log("in /all route!");
    try {
        const allData = await getData();

        res.json(allData);
        return
    }
    catch (err) {
        return next(err)
    }
});
function missedAllHandler(req, res) {
    console.log("missed all routes: ", req.url, req.path);
    res.status(404).send("not found");
}
function errorHandler(error, req, res) {
    console.log("There was an error: ", error);
    res.status(404).send("not found");
}
app.use(missedAllHandler)
app.use(errorHandler)
app.listen(port, (err) => {
    if (err) return console.log("error with listening!");
    console.log("connected successfuly to port " + port)
})