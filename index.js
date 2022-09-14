const express = require('express');
const carInfo = require('./scripts/carInfo');
const indCarInfo = require('./scripts/indCarInfo');
const similarCarInfo = require('./scripts/similarCarInfo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//home route
app.get('/', (req, res) => {
    res.send('This is car info API');
});

//GET car info by city
app.get('/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const data = await carInfo.getData(city);
        res.json(data);

    } catch (error) {
        res.json(error);
    }
});

//GET individual car info by city and car id
app.get('/:city/:producer/:model/:transmission/:id', async (req, res) => {
    const { city, producer, model, transmission, id } = req.params;
    try {
        const data = await indCarInfo.getData(city, producer, model, transmission, id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

//GET similar cars
app.get('/:id/:cityId', async (req, res) => {
    const { id, cityId } = req.params;
    try {
        const data = await similarCarInfo.getData(id, cityId);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});