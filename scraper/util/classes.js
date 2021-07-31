const { getAnalytics } = require("../analysis/nlp");
const { createPasteData, getCurrentLabels, updateGeneralData, getDateOfLastPaste } = require("./mongoFunctions");
const { delay } = require("./util");

// creates instances of intervalcontrollers.
class IntervalController {
    constructor(intervalCallback, time) {
        this.interval = null;
        this.status = false;
        this.firstCallback = true;
        this.time = time;
        this.callbackType = intervalCallback === 'analyze' ? 'analyze' : 'scraper'
        this.intervalCallback = intervalCallback === 'analyze' ? this.analyze : intervalCallback;
    }
    analyze = async () => {
        await delay();
        try {
            if (!this.pastes) {
                return console.log("no pastes yet");
            }
            const paste = this.pastes[0]
            const labels = await getCurrentLabels();
            console.log("analysis starting...");
            if (this.firstCallback) {
                await updateGeneralData(paste);
                this.firstCallback = false;
            }
            else {
                paste.labels = labels;
                paste.save();
            }
            // console.log(paste);
            const analytics = await getAnalytics(paste.title + paste.content[0], paste.labels || labels);

            await createPasteData(paste, analytics);
            updateGeneralData(paste);
            this.pastes.splice(0, 1);
            if (this.pastes.length === 0) {
                this.clearInterval();
            }
        }
        catch (err) {
            console.log("something went wrong analyzing the pastes: ", err);
        }
    }

    clearInterval = () => {
        clearInterval(this.interval);
    }

    setInterval = async () => {
        if (this.status) return console.log("interval " + this.callbackType + " allready exist");
        const interval = setInterval(this.intervalCallback, this.time);
        this.interval = interval;
        this.status = true;
        console.log("started an interval for " + this.callbackType);
    }
}
module.exports = IntervalController