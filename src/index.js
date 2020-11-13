const express = require("express"),
      bodyParser = require("body-parser"),
      api = require("./api"),
      swaggerUi = require('swagger-ui-express'),
      swaggerDocument = require('./swagger.json'),
      app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
api.set(app);

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});