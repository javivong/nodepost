const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jugador = {
    nombre:'',
    apellido: '',
    score:''
   };

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
       };
    res.send(respuesta);
});

app.get('/hola', function (req, res) {
    res.send('[GET]Saludos desde express');
});

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
