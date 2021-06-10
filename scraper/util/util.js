const { Paste } = require('../mongo');
const cheerio = require('cheerio');
const tr = require('tor-request');
tr.setTorAddress("torproxy");

//  scrapes and creates first scrape in db
function createFirstPastes() {
    console.log("getting first data");
    getData().then(data => {
        console.log("thats what i got: ", data);
        if (!data) return;
        createPastes(data)
        console.log("pushed first data to db successfully");
    }).catch(console.log)
}

// delay in 20 seconds, returns a promise
function delay() {
    return new Promise(resolve => {
        setTimeout(() => resolve(), 20000)
    })
}

// gets the data from all pastes in all pages. returns a promise.
function getData(dateOfLastPasteInDb) {
    return new Promise((resolve, reject) => {
        tr.request('http://nzxj65x32vh2fkhk.onion/all', async function (err, res, body) {
            if (err || res.statusCode !== 200) {
                return console.log("something went wrong: ", err);
            }
            const mainPage = cheerio.load(body);
            const numberOfPages = mainPage('.pagination > li').get().slice(1, -1).length;
            const allData = [];
            let respondsCount = 0
            for (let page = 1; page <= numberOfPages; page++) {
                await tr.request(`http://nzxj65x32vh2fkhk.onion/all?page=${page}`, async function (err, res, body) {
                    if (err || res.statusCode !== 200) {
                        return console.log("something went wrong: ", err);
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
                        allData.sort((a, b) => a.createdAt - b.createdAt)
                        resolve(allData);
                    }
                })
            }
        });
    });
}
//  get the last paste's date, if no pastes returns "false"
async function getDateOfLastPaste(params) {
    const lastPaste = await Paste.find({}, 'date').sort({ "date": -1 }).limit(1)
    if (!lastPaste[0]) {
        return false
    }
    return lastPaste[0].date;
}

//  creates one or more new pastes in db.
async function createPastes(data) {
    try {
        await Paste.create(data)
        console.log("paste(s) added: ", data);
    }
    catch (err) {
        console.log("error in createPastes? :", err);
    }
}

// makes requests to all given links and pulls the pastes data. returns a promise.
function getLinksData(pageLinks, dateOfLastPasteInDb) {
    return new Promise((resolve, reject) => {
        const pageData = [];
        const numberOfLinks = pageLinks.length;
        pageLinks.forEach((link, i) => {
            tr.request(link, function (err, res, body) {
                if (err || res.statusCode !== 200) {
                    return console.log("something went wrong: ", err);
                }
                const pastePage = cheerio.load(body);
                const rawSignature = pastePage('.pre-footer > .row > :not(.text-right)').text().trim();
                const date = new Date(rawSignature.slice(-25, -4).replace(',', ''));
                if (date <= dateOfLastPasteInDb || 0) return resolve(pageData);
                const title = pastePage('.col-sm-5 > h4').text().trim()
                const content = pastePage('ol > li').text().trim();
                const author = rawSignature.slice(10, -29);
                pageData.push(new Paste({ title, content, date, author }));
                if (pageData.length === numberOfLinks) return resolve(pageData);
            });

        })
    })
}

module.exports = { delay, getData, getDateOfLastPaste, createPastes, createFirstPastes }