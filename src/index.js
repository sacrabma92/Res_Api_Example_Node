const express = require("express");
const morgan = require("morgan");
const app = express();

// Configuracion
// process.env.PORT en dado caso existe un puerto definido por el servidor tomelo, si no escoja el 3000
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //Interpreta formularios que vienen HTML
app.use(express.json()); //Interpreta los JSON

// Routes
app.use(require("./routes/index.js"));
app.use("/api/peliculas", require("./routes/peliculas.js"));

// Comenzando el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
});
