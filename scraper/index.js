
const { getDateOfLastPaste, createPastes, createFirstPastes, getData } = require('./util/util');
let pastesUpdaterInterval = null;

// TODO: fix check if torproxy open anyloop

createFirstPastes()
intervalController(pastesUpdater);


function intervalController(pastesUpdater, shouldDelete) {
    if (shouldDelete) {
        clearInterval(pastesUpdaterInterval);
        return;
    }
    const newInterval = setInterval(pastesUpdater, 60000);
    pastesUpdaterInterval = newInterval;
}

async function pastesUpdater() {
    try {
        const dateOfLastPaste = await getDateOfLastPaste();
        if (!dateOfLastPaste) {
            const deleteInterval = true
            intervalController(pastesUpdater, deleteInterval);
            await createFirstPastes()
            intervalController(pastesUpdater);
            return console.log("didnt have any data in the db, getting data again");
        }
        console.log("dateOfLastPaste: ", dateOfLastPaste)
        const newData = await getData(dateOfLastPaste);
        if (newData.length === 0) return;
        createPastes(newData);
    }
    catch (err) {
        console.log("error in the interval: ", err);
    }
}


