const puppeteer = require('puppeteer');

async function getData(city, producer, model, transmission, id) {
    try {
        const URL = `https://www.revv.co.in/open/${city}/${producer}/${model}${transmission}/stock/confirm?c_id=${id}`;

<<<<<<< HEAD
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
=======
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
>>>>>>> 7c86c75518be2a95c26c8c9cf0826dc7eaf11a98
        const page = await browser.newPage();
        let result;
        await page.setViewport({ width: 1200, height: 800 })
        await page.setRequestInterception(true)

        page.on('request', (request) => {
            request.continue()
        })

        page.on('response', async (response) => {
            try {
                if (response.url() == "https://admin.revv.co.in/api/v1/lt/stock/get/cardetails") {
                    result = await response.json();
                }

            } catch (e) {
                console.log(e);
            }
        })

        await page.goto(URL, { waitUntil: 'load', timeout: 0 });

        await browser.close();

        return result;

    } catch (error) {
        console.log(error);
    }
}
exports.getData = getData;
