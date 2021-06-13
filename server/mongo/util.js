const { Paste, PasteData, GeneralData } = require('../mongo/stronghold');



module.exports.getData = async function getData() {
    try {
        const pastes = await Paste.find().sort({ 'date': -1 })
        const dataAnalysis = await PasteData.find({});
        const [generalData] = await GeneralData.find({});
        // console.log("dataAnalysis: ", dataAnalysis);
        return { pastes, dataAnalysis: { generalData, pastesData: dataAnalysis } };
    } catch (err) {
        console.log(err);
    }
}



