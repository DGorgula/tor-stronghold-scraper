const { delay } = require('../../server/mongo/util');
const { getAnalytics } = require('./nlp.js');
// const { Paste } = require('./mongo/stronghold');
// const { PasteData } = require('./mongo/stronghold');

async function analyze(paste) {
    await delay();
    try {
        const analytics = await getAnalytics(paste.title + paste.content[0], ["sea", "beach"]);
        console.log(analytics);
    } catch (err) {
        console.log("something went wrong: ", err);
    }
}
setInterval(() => {
    if (pastesToAnalyze === 0) return console.log("no pastes to analyze");;
    const paste = pastesToAnalyze[0];
    pastesToAnalyze.splice(0, 1);
    analyze(paste);

}, 60100)

function get(params) {

}