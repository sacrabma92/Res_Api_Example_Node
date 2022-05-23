const { Router } = require("express");
const router = Router();
const _ = require("underscore");

const peliculas = require("../ejemplo.json");

router.get("/", (req, res) => {
  res.json(peliculas);
});

router.post("/", (req, res) => {
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    const id = peliculas.length + 1;
    const nuevaPelicula = { ...req.body, id };
    peliculas.push(nuevaPelicula);
    res.json(peliculas);
  } else {
    res.status(500).json({ error: "Ha ocurrido un error." });
  }
});

// Actualizar los datos
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    _.each(peliculas, (pelicula, i) => {
      if (pelicula.id == id) {
        pelicula.title = title;
        pelicula.director = director;
        pelicula.year = year;
        pelicula.rating = rating;
      }
    });
    res.json(peliculas);
  } else {
    res.status(500).json({ error: "Hubo un error" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  _.each(peliculas, (pelicula, i) => {
    if (pelicula.id == id) {
      i++;
      console.log("El ID es: " + i);
      peliculas.splice(i, 1);
    }
  });
  console.log("El ID es: " + id);
  res.send(peliculas);
});

module.exports = router;
