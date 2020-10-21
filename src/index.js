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

app.post('/gamer', function (req, res) {
    if (req.body.nombre == null || req.body.apellido == null || req.body.score == null) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Los campos nombre, apellido y score son obligatorios' 
        };
    }
    else if (Object.keys(req.body).every(i => req.body[i] == jugador[i])) {
        respuesta = {
            error: true,
            codigo: 503,
            mensaje: 'Este jugador ya ha sido creado' 
        };
    }
    else {
        jugador = req.body;
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Jugador creado',
            respuesta: jugador 
        };
    };
    res.send(respuesta);
})

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
