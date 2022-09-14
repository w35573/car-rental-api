const axios = require('axios');

async function getData(id, cityId) {
    try {
        const URL = `https://admin.revv.co.in/api/similarCars?ltServiceCityId=${cityId}&carModelID=${id}&ltType=2&oem=`;

        const response = await axios.get(URL);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}
exports.getData = getData;