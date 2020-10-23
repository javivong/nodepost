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

let jugadors = [{
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
    var ranking = {
        nombreJugadors: jugadors.length,
        jugadors: jugadors
    };
    res.send(ranking); // Los jugadores ya están ordenados.
});

app.get('/jugador/:alies', function (req, res) {
    jugador = jugadors.find(quinJugador => quinJugador.alies === req.params.alies); 
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
    if (Object.values(req.body).some(camp => camp == null)) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Els camps alies, nom, cognom i score son requerits' 
        };
    } else if (jugadors.some(camp => camp.alies === req.params.alies)) {
        respuesta = {
            error: true,
            codigo: 503,
            mensaje: 'El jugador ja ha sigut creat' 
        };
    } else {
        jugador = req.body;
        jugadors.push(jugador);
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Jugador creat',
            respuesta: jugador 
        };
        OrdenaRanking();
    };
    res.send(respuesta);
});

app.put('/jugador/:alies', function (req, res) {
    if (Object.values(req.body).some(camp => camp == null)) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Els camps alies, nom, cognom i score son requerits' 
        };
        res.send(respuesta);
    }
    else if (req.body.score < 0) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Score no pot tenir un valor negatiu' 
        };
        res.send(respuesta);
    }
    else {
        var indexJugador = jugadors.findIndex(camp => camp.alies === req.params.alies);
        if (indexJugador == -1) {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El jugador no existeix' 
            };
        } else {
            jugadores[indexJugador] = req.body;
            OrdenaRanking();
        };
    }
});

function OrdenaRanking() {
    jugadors.sort((a, b) => b.score - a.score);
    jugadors.forEach((cadaJugador, indexJugador) => cadaJugador.posicio = indexJugador + 1);
};

app.listen(3000, () => { console.log("El servidor está inicializado en el puerto 3000"); });