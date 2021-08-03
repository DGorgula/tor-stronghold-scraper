const { Paste, PasteData, GeneralData } = require('./mongoConnection');
const cheerio = require('cheerio');
const tr = require('tor-request');
const { createPastes } = require('./mongoFunctions');
tr.setTorAddress("torproxy");


// TODO: move createFirstPastes to index.js
//  scrapes and creates first scrape in db
async function createFirstPastes() {
    try {

        console.log("getting first data");
        const data = await scrapeData();
        if (!data) return;
        const dataEntered = await createPastes(data)
        return dataEntered;
    }
    catch (err) {
        console.log("error createFirestPastes: ", err);
    }
}

// delay in 20 seconds, returns a promise
function delay() {
    return new Promise(resolve => {
        setTimeout(() => resolve(), 20000)
    })
}

// gets the data from all pastes in all pages. returns a promise.
function scrapeData(dateOfLastPasteInDb) {
    return new Promise((resolve, reject) => {
        tr.request('http://nzxj65x32vh2fkhk.onion/all', async function (err, res, body) {
            if (err || res.statusCode !== 200) {
                return reject("something went wrong with first page: ", err);
            }
            const mainPage = cheerio.load(body);
            const numberOfPages = mainPage('.pagination > li').get().slice(1, -1).length;
            const allData = [];
            let respondsCount = 0
            for (let page = 1; page <= numberOfPages; page++) {
                await tr.request(`http://nzxj65x32vh2fkhk.onion/all?page=${page}`, async function (err, res, body) {
                    if (err || res.statusCode !== 200) {
                        return reject("something went wrong with page: ", err);
                    }
                    const pageHtml = cheerio.load(body);
                    const buttons = pageHtml('.btn').get();
                    const pageLinks = buttons.map(btn => {
                        return btn.attribs.href
                    })
                    try {
                        const pageData = await getLinksData(pageLinks, dateOfLastPasteInDb);
                        allData.push(...pageData);
                    }
                    catch (err) {
                        if (Array.isArray(err) && err.length > 0) {
                            allData.push(...err);
                            resolve(data);
                        }
                    }
                    respondsCount++
                    if (respondsCount === numberOfPages) {
                        allData.sort((a, b) => a.date - b.date)
                        resolve(allData);
                    }
                })
            }
        });
    });
}




// makes requests to all given links and pulls the pastes data. returns a promise.
function getLinksData(pageLinks, dateOfLastPasteInDb) {
    return new Promise((resolve, reject) => {
        const pageData = [];
        const numberOfLinks = pageLinks.length;
        pageLinks.forEach((link, i) => {
            tr.request(link, function (err, res, body) {
                if (err || res.statusCode !== 200) {
                    return reject("something went wrong with the link: ", err);
                }
                const pastePage = cheerio.load(body);
                const rawSignature = pastePage('.pre-footer > .row > :not(.text-right)').text().trim();
                const rawViews = pastePage('.pre-footer > .row > .text-right').text().trim();
                const regexedRawViews = /\D+(\d+)/g.exec(rawViews);
                const views = regexedRawViews[1];
                const date = new Date(rawSignature.slice(-25, -4).replace(',', ''));
                if (date <= dateOfLastPasteInDb || 0) return resolve(pageData);
                const title = pastePage('.col-sm-5 > h4').text().trim()
                const content = pastePage('ol > li').text().trim();
                const author = rawSignature.slice(10, -29);
                const newPaste = new Paste({ title, content, date, author, views })
                pageData.push(newPaste);
                if (pageData.length === numberOfLinks) return resolve(pageData);
            });

        })
    })
}

module.exports.delay = delay
module.exports.scrapeData = scrapeData
module.exports.createFirstPastes = createFirstPastes
