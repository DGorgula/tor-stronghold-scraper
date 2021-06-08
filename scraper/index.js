const cheerio = require('cheerio');
const tr = require('tor-request');
const { Paste } = require('./mongo');
tr.setTorAddress("torproxy");



getData().then(data => Paste.create(data)).catch(console.log)
setInterval(() => {
    Paste.find({}, 'createdAt').sort({ "createdAt": -1 }).limit(1)
        .then(oldData => {
            const lastPasteDate = oldData[0].createdAt;
            console.log("lastPasteDate: ", lastPasteDate)
            getData(lastPasteDate)
                .then(data => {
                    if (data.length > 0) {
                        Paste.create(data)
                            .then((pastes) => console.log("paste(s) added: ", pastes))
                            .catch(console.log)
                    }
                })
                .catch(console.log)
        })
        .catch(console.log)
}, 60000);




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
                if (date <= dateOfLastPasteInDb) return resolve(pageData);
                const title = pastePage('.col-sm-5 > h4').text().trim()
                const content = pastePage('ol > li').text().trim();
                const author = rawSignature.slice(10, -29);
                pageData.push(new Paste({ title, content, date, author }));

                if (pageData.length === numberOfLinks) return resolve(pageData);
            });

        })
    })
}