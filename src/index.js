const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let jugador = {
    posicio: '',
    alies: '',
    nom:'',
    cognom: '',
    score:''
   };

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

let jugadores = [{
    posicio: "1",
    alies: "jperez",
    nom: "Jose",
    congnom: "Perez",
    score: "1000"
},
{
    posicio: "2",
    alies: "jsanz",
    nom: "Juan",
    congnom: "Sanz",
    score: "950"
},
{
    posicio: "3",
    alies: "mgutierrez",
    nom: "Maria",
    congnom: "Gutierrez",
    score: "850"
}];

app.get('/', function (req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
       };
    res.send(respuesta);
});

app.get('/ranking', function (req, res) {
    jugadores = jugadores.sort(function (a, b) {
        if (a.posicio > b.posicio) { return 1;}
        if (a.posicio < b.posicio) { return -1;}
        return 0;
    });
    res.send(jugadores); 
});

app.get('/jugador/:alies', function (req, res) {
    jugador = jugadores.find(function (quinJugador) { 
        return quinJugador.alies === req.params.alies; 
    }); 
    if (jugador == null) {
        respuesta = {
            error: true,
            codi: 504,
            missatge: "El jugador no existeix"
        };
        res.send(respuesta);
    } else {
        res.send(jugador);
    };
});

app.post('/jugador/:alies', function (req, res) {
    if (req.body.some(camp => camp == null)) {  //req.body.nom == null || req.body.cognom == null || req.body.score == null) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Els camps alies, nom, cognom i score son requerits' 
        };
    }
    else if (jugadores.some(camp => camp.alies === req.params.alies)) {
        respuesta = {
            error: true,
            codigo: 503,
            mensaje: 'El jugador ja ha sigut creat' 
        };
    }
    else {
        jugador = req.body;
        jugadores.push(jugador);s
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Jugador creat',
            respuesta: jugador 
        };
    };
    res.send(respuesta);
})

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
