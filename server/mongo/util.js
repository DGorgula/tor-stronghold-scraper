const { Paste } = require('../mongo/stronghold');



module.exports.getAllPastes = async function getAllPastes(labels) {
    try {
        const data = await Paste.find().sort({ 'createdAt': -1 })
        // const dataAnalysis = await PasteData.find({ labels })
        // console.log("dataAnalysis: ", dataAnalysis);
        return data;
    } catch (err) {
        console.log(err);
    }
}



