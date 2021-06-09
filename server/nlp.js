const NLPCloudClient = require('nlpcloud');
const { NLP_CLOUD_TOKEN } = process.env;
// const getNLP = {};
const clientForEntities = new NLPCloudClient('en_core_web_lg', 'c4987ec167087c9a1f93002e982022dcfb699d31')
// getNLP.entities = getNLP.entitiesClient.entities;
const clientForClassification = new NLPCloudClient('bart-large-mnli', 'c4987ec167087c9a1f93002e982022dcfb699d31')
// getNLP.classification = getNLP.classificationClient.classification;
// client.entities('John Doe has been working for Microsoft in Seattle since 1999.')
function getAnalytics(content, labels) {
    const analytics = {
        entities: null,
        classifications: null
    };
    return new Promise((resolve, reject) => {
        clientForEntities.entities(content)
            .then((entities) => {
                analytics.entities = entities.data
                if (!labels) throw new Error("could not get entities: Did not get any labels")
                clientForClassification.classification(content,
                    labels,
                    labels ? labels.length > 1 : false)
                    .then((classifications) => {
                        analytics.classifications = classifications.data
                        // TODO: fix regex and create validation
                        // /^\[\ (\{\ start:\ \d +,\ end:\ \d +,\ type:\ '[A-Z_]{2,11}',\ text:\ '[a-zA-Z0-9:./\\$%]{1,30}'\ \ },\n\ \ )+\{\ start:\ \d +,\ end:\ \d +,\ type:\ '[A-Z_]{2,11}',\ text:\ '[a-zA-Z0-9:./\\$%]{1,30}'\ \ }\ \]$/.test(data)
                    })
                    .catch((err) => console.log("could not get entities: ", err.message))

            })
            .catch(err => console.log("error with entities or classifications: ", err.message))
            .finally(() => {
                if (!(analytics.classifications || analytics.entities)) return reject(analytics)
                return resolve(analytics)
            })
    });
}
getAnalytics("just some content facebook will save and sell to Google and whoever it wants. so Albert Einstein said.. I love Milk! and I love You!!!!")
    .then(console.log)
    .catch((err) => console.log("couldnt get all analytics: ", err))

// client.classification(`John Doe is a Go Developer at Google.
//   He has been working there for 10 years and has been 
//   awarded employee of the year.`,
//     ["job", "nature", "space"],
//     true)


module.exports.getAnalytics = getAnalytics;