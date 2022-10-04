const axios = require('axios');

async function getData(startDate, endDate, long, lat, location) {
    const URL = `https://admin.revv.co.in/api/v2/carInfo/startDate=${startDate}&endDate=${endDate}&longitude1=${long}&latitude1=${lat}&longitude2=${long}&latitude2=${lat}&carInfoID=0&bookingId=0?deviceType=website&customerID=null&pickupLocation=${location}`;

    console.log(URL);

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

exports.getData = getData;