const request = require("supertest");
const app = require("../app");

let id;

test("GET /actors debe traer todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
  const newArtist = {
    firstName: "carlos",
    lastName: "mendoza",
    nacionality: "United States",
    image: "http://image.com",
    birthday: 2000 - 4 - 24,
  };
  const res = await request(app).post("/actors").send(newArtist);
  id = res.body.id;
  //   console.log(res.body);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newArtist.name);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
  const updatedActor = {
    firstName: "eduardo",
  };
  const res = await request(app).put(`/actors/${id}`).send(updatedActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedActor.firstName);
});

// test("POST /actors/:id/genres debe insertar los generos de un actor", async () => {
//   const genre = await Genre.create({
//     name: "drama",
//   });
//   const res = await request(app).post(`/actors/${id}/genres`).send([genre.id]);
//   await genre.destroy();
//   expect(res.status).toBe(200);
//   expect(res.body).toBeInstanceOf(Array);
//   expect(res.body.length).toBe(1);
// });

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete("/actors/" + id);
  expect(res.status).toBe(204);
});
