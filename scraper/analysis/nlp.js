const NLPCloudClient = require('nlpcloud');
const delayParent = require('../util/util');
const { NLP_CLOUD_TOKEN } = process.env;

const clientForEntities = new NLPCloudClient('en_core_web_lg', 'c4987ec167087c9a1f93002e982022dcfb699d31')
const clientForClassification = new NLPCloudClient('bart-large-mnli', 'c4987ec167087c9a1f93002e982022dcfb699d31')

async function getAnalytics(content, labels) {
    const analytics = {
        entities: null,
        classifications: null
    };
    try {
        const entities = await clientForEntities.entities(content)
        analytics.entities = entities.data.entities
        if (!labels) throw new Error("could not get entities: Did not get any labels")
        await delayParent.delay()
        const classifications = await clientForClassification.classification(content,
            labels,
            labels.length > 1 ? true : false)
        // console.log(classifications.data);
        analytics.classifications = classifications.data
        // TODO: fix regex and create validation
        // /^\[\ (\{\ start:\ \d +,\ end:\ \d +,\ type:\ '[A-Z_]{2,11}',\ text:\ '[a-zA-Z0-9:./\\$%]{1,30}'\ \ },\n\ \ )+\{\ start:\ \d +,\ end:\ \d +,\ type:\ '[A-Z_]{2,11}',\ text:\ '[a-zA-Z0-9:./\\$%]{1,30}'\ \ }\ \]$/.test(data)
    } catch (err) {
        console.log("could not get classifications: ", err.message)

    }
    // if (!(analytics.classifications || analytics.entities)) return reject(analytics)
    return analytics
}

module.exports.getAnalytics = getAnalytics