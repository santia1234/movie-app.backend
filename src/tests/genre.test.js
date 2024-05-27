const request = require("supertest");
const app = require("../app");

let id;

test("GET /genres debe traer todos los generos", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear un genero", async () => {
  const newGenre = {
    name: "fantasia",
  };
  const res = await request(app).post("/genres").send(newGenre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newGenre.name);
});

// test("GET /genres/:id debe traer un genero por id", async () => {
//   const res = await request(app).get("/genres/" + id);
//   expect(res.status).toBe(200);
//   expect(res.body).toBeInstanceOf(Object);
// });

test("PUT /genres/:id debe actualizar un genero", async () => {
  const updatedGenre = {
    name: "accion",
  };
  const res = await request(app)
    .put("/genres/" + id)
    .send(updatedGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
});

test("DELETE /genres/:id debe eliminar un genero", async () => {
  const res = await request(app).delete("/genres/" + id);
  expect(res.status).toBe(204);
});
