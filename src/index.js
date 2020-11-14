const express = require("express"),
      bodyParser = require("body-parser"),
      api = require("./api"),
      swaggerUi = require('swagger-ui-express'),
      swaggerDocument = require('./openapi.json'),
      app = express(),
      router = express.Router(),
      PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
api.set(router);



app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});