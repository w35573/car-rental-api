const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./data/swagger.json');
const carInfo = require('./scripts/carInfo');
const indCarInfo = require('./scripts/indCarInfo');
const similarCarInfo = require('./scripts/similarCarInfo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//GET home page
app.get('/', (req, res) => {
    res.send('Welcome to the Car API');
});

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

//middleware for swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});