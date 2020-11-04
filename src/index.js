const express = require("express");
const morgan = require("morgan");
const path = require("path");
const expresshbs = require('express-handlebars');
const flash = require('connect-flash')
const session = require("express-session");
const mysqlStore = require("express-mysql-session");


const { database } = require("./keys");


//Inicializaciones
const app = express();


//Archivos Publicos (codigo que el navegador puede acceder)
app.use(express.static(path.join(__dirname, "/public")));

//Configuraciones
app.set("port", process.env.PORT || 4000);
//ruta de la carpeta views
app.set("views", path.join(__dirname, "views"));

app.engine(
    ".hbs",
    expresshbs({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
      helpers: require("./lib/handlebars")
    })
  );
  app.set("view engine", ".hbs");



//Middlewares
app.use(
  session({
    secret: "Session",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
  })
);
app.use(flash())
app.use(morgan("dev")); //para mostrar mensajes en consola con las solicitudes y que valor retorna
app.use(express.urlencoded({ extended: false })); //aceptar desde el formulario los datos del usuario
app.use(express.json());



//Variables Globales

app.use((req,res,next) => {
  app.locals.message = req.flash("message");

  next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));



//Inicialización del servidor
app.listen(app.get("port"), () => {
  console.log("Server en puerto ", app.get("port"));
});
