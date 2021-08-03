
const { createFirstPastes, scrapeData } = require('./util/util');
const IntervalController = require("./util/classes");
const { createPastes, getDateOfLastPaste } = require('./util/mongoFunctions');
// require('./analysis/analist');
// TODO: fix check if torproxy open anyloop

const scraperIntervalController = new IntervalController(pastesUpdater, 60000)


const analyzeIntervalController = new IntervalController('analyze', 60100);
analyzeIntervalController.pastes = [];
analyzeIntervalController.analizedPastesIDs = [];
analyzeIntervalController.pushPastes = function (pastes) {
    const { analizedPastesIDs } = analyzeIntervalController;
    const pastesToAnalyze = pastes.filter(paste => !(analizedPastesIDs.includes(paste._id)))
    if (pastesToAnalyze.length === 0) {
        console.log("no pastes to analyze");
        return 0;
    }
    this.pastes.push(...pastesToAnalyze);
    return pastesToAnalyze.length;
}


createFirstPastes()
    .then(dataEntered => {
        console.log("got first data!");
        if (!dataEntered) {
            return console.log("didnt get any data");
        }
        scraperIntervalController.setInterval();
        analyzer(dataEntered);

    })
    .catch(err => console.log("firstpasteserror", err))

// function intervalController(pastesUpdater, shouldDelete) {
//     if (shouldDelete) {
//         clearInterval(pastesUpdaterInterval);
//         return;
//     }
//     const newInterval = setInterval(pastesUpdater, 60000);
//     pastesUpdaterInterval = newInterval;
// }


async function analyzer(pastes) {
    console.log("analyzer-ana-analyzer!");
    if (!pastes) return;
    const howManyPushed = analyzeIntervalController.pushPastes(pastes);
    if (howManyPushed === 0) return console.log("no pastes to analyze");
    console.log("there are " + howManyPushed + " pastes");
    analyzeIntervalController.setInterval();
}





async function pastesUpdater() {
    try {
        const dateOfLastPaste = await getDateOfLastPaste();
        if (!dateOfLastPaste) {
            scraperIntervalController.clearInterval();
            await createFirstPastes()
            scraperIntervalController.setInterval();
            return console.log("didnt have any data in the db, getting data again");
        }
        console.log("dateOfLastPaste: ", dateOfLastPaste)
        const newData = await scrapeData(dateOfLastPaste);
        if (newData.length === 0) return;
        const dataEntered = await createPastes(newData);
        analyzer(dataEntered)
    }
    catch (err) {
        console.log("error in the interval: ", err);
    }
}

