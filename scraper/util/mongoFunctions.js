const { PasteData, Label, Paste, GeneralData, Entity } = require("./mongoConnection");

async function createPasteData(paste, data) {
    const { _id } = paste;
    const { entities, classifications } = data;
    if (!data) return
    if (!data) return
    // console.log("create paste data:", data);
    const labels = classifications.labels.map((label, i) => {
        return new Label({ label, score: classifications.scores[i], type: "standard" });
    });

    const newPasteData = new PasteData({
        pasteId: _id,
        entities,
        labels
    });
    Paste.update({ labels })
    const response = await PasteData.create(newPasteData);
    // console.log("added data: ", response);
}


async function updateGeneralData(paste) {
    const allPasteDatas = await PasteData.find({});
    const pasteData = allPasteDatas.find(data => data.pasteId.toString() === paste._id.toString());
    console.log(pasteData);

    const latestGeneralData = await GeneralData.findOne({})
    let dataToUpdate = latestGeneralData ? latestGeneralData : new GeneralData({ mostViewed: paste });
    // logic to check if labels exits in labelsHistory

    // const labelsNotInLabelsHistory = [];
    // console.log("labelsHistory: ", dataToUpdate.labelsHistory);
    // dataToUpdate.labelsHistory.forEach(someLabels => {
    //     const shouldAddSomeLable = paste.labels.some(label => {
    //         if (!someLabels.includes(label) && !labelsNotInLabelsHistory.includes(someLabels)) return true;
    //         return false;
    //     });
    //     if (shouldAddSomeLable) {
    //         console.log("someLabels: ", someLabels);
    //         labelsNotInLabelsHistory.push(...paste.lables);
    //     }
    // })
    // if (labelsNotInLabelsHistory) {
    //     dataToUpdate.labelsHistory.push(labelsNotInLabelsHistory)
    // }
    dataToUpdate.analysisCount += 1;
    if (!dataToUpdate.labelsHistory.includes(dataToUpdate.currentLabels)) {
        dataToUpdate.labelsHistory.push(dataToUpdate.currentLabels);
    }

    if (pasteData) {
        const newEntities = [];
        pasteData.entities.forEach(entity => {
            const entityAsEntitySchema = { type: entity.type, text: entity.text }
            if (!dataToUpdate.allEntities.includes(entityAsEntitySchema)) {
                const newEntity = new Entity(entityAsEntitySchema);
                newEntities.push(newEntity)
            }
        });
        dataToUpdate.allEntities.push(...newEntities);
    }


    if (paste.views > dataToUpdate.mostViewed[0].views && !(dataToUpdate.mostViewed.map(mv => mv._id).includes(paste._id))) {
        dataToUpdate.mostViewed = [paste];
    }
    else if (dataToUpdate.mostViewed[0].views === paste.views && !(dataToUpdate.mostViewed.map(mv => mv._id).includes(paste._id))) {
        dataToUpdate.mostViewed.push(paste);
    }

    if (!paste.labels[0]) {
        paste.lables = dataToUpdate.currentLabels;
    }

    paste.labels.forEach((label, i) => {
        if (!pasteData) return
        const lowestLabelScoreObject = dataToUpdate.lowestLabelScores.find((q => {
            return q.label === label
        }))
        if (lowestLabelScoreObject) {
            console.log("1 in if");

            const pasteScoreisLower = pasteData.labels[i].score < lowestLabelScoreObject.score;
            if (pasteScoreisLower) {
                console.log("2 ");
                lowestLabelScoreObject.score = pasteData.labels[i].score;
            }
            console.log("3 ", pasteScoreisLower);
        }
        else {
            console.log("4 ");
            dataToUpdate.lowestLabelScores.push({ score: pasteData.labels[i].score, label: pasteData.labels[i].label, type: 'lowest' })
        }
        const highestLabelScoreObject = dataToUpdate.highestLabelScores.find((q => q.label === label))
        if (highestLabelScoreObject) {
            const pasteScoreisHigher = pasteData.labels[i].score > highestLabelScoreObject.score;
            if (pasteScoreisHigher) {
                highestLabelScoreObject.score = pasteData.labels[i].score;
            }
        }
        else {
            dataToUpdate.highestLabelScores.push({ score: pasteData.labels[i].score, label: pasteData.labels[i].label, type: 'highest' })
        }
        const averageLabelScoreObject = dataToUpdate.labelAverage.find((q => q.label === label))
        if (averageLabelScoreObject) {
            const { score, count } = averageLabelScoreObject

        }
        else {
            dataToUpdate.labelAverage.push({ score: pasteData.labels[i].score, label: pasteData.labels[i].label, type: 'average' })
        }

    })

    // TODO: check if new Date changes on update
    // updatedData.analysisStartingDate = latestGeneralData.analysisStartingDate ? latestGeneralData.analysisStartingDate : new Date();
    // console.log("updating this general data: ", dataToUpdate);
    paste.save();
    // pasteData.save()
    dataToUpdate.save()
}


//  creates one or more new pastes in db.
async function createPastes(data) {
    try {
        const dataEntered = await Paste.create(data, { updated: true })

        return dataEntered;
    }
    catch (err) {
        console.log("error in createPastes? :", err);
    }
}

//  get the last paste's date, if no pastes returns "false"
async function getDateOfLastPaste() {
    const lastPaste = await Paste.find({}, 'date').sort({ "date": -1 }).limit(1)
    if (!lastPaste[0]) {
        return false
    }
    return lastPaste[0].date;
}


// gets all pastes from db, sorted by date DESC
async function getAllPastes(toAnalyze) {
    try {
        if (toAnalyze) {
            const data = await Paste.find({}, '_id').sort({ 'date': -1 })
        }
        const data = await Paste.find().sort({ 'date': -1 })
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function getCurrentLabels() {
    // console.log("GeneralData", GeneralData);
    const generalData = await GeneralData.findOne({});
    const another = await GeneralData.find({});
    // console.log("findOne: ", typeof (generalData), generalData);
    // console.log("find: ", typeof (another), another);
    if (generalData) {
        return generalData.currentLabels
    }
    return generalData
}
module.exports = { createPasteData, updateGeneralData, createPastes, getDateOfLastPaste, getAllPastes, getCurrentLabels }