const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const app = express()
api.setup(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});