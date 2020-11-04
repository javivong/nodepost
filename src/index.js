const api = require("./api");
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

api.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});