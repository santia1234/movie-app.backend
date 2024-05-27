const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

let id;

test("GET /movies debe traer todas las películas", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una película", async () => {
  const newMovie = {
    name: "titanic",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg",
    synopsis: "pelicula de drama",
    releaseYear: 2008,
  };
  const res = await request(app).post("/movies").send(newMovie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newMovie.name);
});

test("PUT /movies/:id debe actualizar una película", async () => {
  const updatedMovie = {
    synopsis: "peliculas de romance",
  };
  const res = await request(app).put(`/movies/${id}`).send(updatedMovie);
  expect(res.status).toBe(200);
  expect(res.body.synopsis).toBe(updatedMovie.synopsis);
});

test("POST /movies/:id/genres debe insertar los géneros de una película", async () => {
  const genre = await Genre.create({
    name: "romance",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/actors debe insertar los actores de una película", async () => {
  const actor = await Actor.create({
    firstName: "eduardo",
    lastName: "lara",
    nacionality: "mexico",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg",
    birthday: "2003-03-21",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe insertar los directores de una película", async () => {
  const director = await Director.create({
    firstName: "eduardo",
    lastName: "lara",
    nacionality: "mexico",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg",
    birthday: "2003-03-21",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id debe eliminar una película", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
