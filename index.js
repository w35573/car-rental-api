const express = require('express');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./data/swagger.json');
const carInfo = require('./scripts/carInfo');
const indCarInfo = require('./scripts/indCarInfo');
const similarCarInfo = require('./scripts/similarCarInfo');
const carStr = require('./scripts/carStr');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

//GET home page
app.get('/', (req, res) => {
    res.send('Welcome to the Car API');
});

//Cars by for months or years

//GET car info by city
app.get('/car/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const data = await carInfo.getData(city);
        res.json(data);

    } catch (error) {
        res.json(error);
    }
});

//GET individual car info by city and car id
app.get('/car/:city/:producer/:model/:transmission/:id', async (req, res) => {
    const { city, producer, model, transmission, id } = req.params;
    try {
        const data = await indCarInfo.getData(city, producer, model, transmission, id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

//GET similar cars
app.get('/car/:id/:cityId', async (req, res) => {
    const { id, cityId } = req.params;
    try {
        const data = await similarCarInfo.getData(id, cityId);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

//Cars for hours or days
//str => short term rental
//allowed timings -->
//0:00 4:00 4:30 5:00 5:30 6:00 6:30 7:00 7:30 8:00 8:30 9:00 9:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00 22:30 23:00 23:30
app.get('/str/:startDate/:endDate/:long/:lat/:location', async function (req, res) {
    const { startDate, endDate, long, lat, location
    } = req.params;
    try {
        const data = await carStr.getData(startDate, endDate, long, lat, location);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

//middleware for swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});