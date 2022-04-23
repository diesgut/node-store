const express = require("express");
const cors = require("cors");
const routerApi=require("./routes");

// Importar middleware de errores
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handlers.js'); 

const app = express();
const port = 3000;

app.use(express.json()); //middleware para el manejo de peticiones con json
/*
const whiteList = ['http://localhost:8080', 'http://myapp.com'];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}
*/
app.use(cors()); //habilitamos peticiones de cualquier origen, el metodo cors puede recibir como argumento la variable options, para permitir ciertos dominios

app.get("/", (req, res) =>{
    res.send("Hola mi server en Express");
});

routerApi(app);

// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
    console.log("My port: " + port);
});
