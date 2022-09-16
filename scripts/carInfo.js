const puppeteer = require('puppeteer');

async function getData(city) {
    try {
        const URL = `https://www.revv.co.in/open/${city}/stock/cars_pricing`;

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const result = [];
        await page.setViewport({ width: 1200, height: 800 })
        await page.setRequestInterception(true)

        page.on('request', (request) => {
            request.continue()
        })

        page.on('response', async (response) => {
            try {
                if (response.url() == "https://admin.revv.co.in/api/v1/lt/car/pricing/get") {
                    const data = await response.json();
                    result.push(data);
                    console.log("hello")
                }
            } catch (e) {
                console.log(e);
            }

            console.log("hi")
        })

        await page.goto(URL);

        await browser.close();

        return result[0];

    } catch (error) {
        throw error;
    }
}
exports.getData = getData;
