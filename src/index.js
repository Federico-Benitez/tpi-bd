const express = require("express");
const morgan = require("morgan");


const { database } = require("./keys");


//Inicializaciones
const app = express();


//Archivos Publicos (codigo que el navegador puede acceder)


//Configuraciones
app.set("port", process.env.PORT || 4000);


//ruta de la carpeta views

//Middlewares
app.use(morgan("dev")); //para mostrar mensajes en consola con las solicitudes y que valor retorna
app.use(express.urlencoded({ extended: false })); //aceptar desde el formulario los datos del usuario



//Variables Globales

//Routes
app.use(require('./routes'))

//Inicialización del servidor
app.listen(app.get("port"), () => {
  console.log("Server en puerto ", app.get("port"));
});
