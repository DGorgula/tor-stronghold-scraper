const { getDateOfLastPaste, delay, scrapeData, getAllPastes } = require('../util/util');
// const { Paste } = require('./mongo/stronghold');
// const { PasteData } = require('./mongo/stronghold');
class IntervalController {
    constructor(intervalCallback, time) {
        this.interval = null;
        this.time = time;
        this.intervalCallback = intervalCallback;
    }

    clearInterval = () => {
        clearInterval(this.interval);
    }

    setInterval = () => {
        const interval = setInterval(this.intervalCallback, this.time);
        this.interval = interval;
    }
}




module.exports.startAnalysis = analyzer