const request = require("supertest");
const app = require("../app");

let id;

test("GET /directors debe traer todos los directoress", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async () => {
  const newArtist = {
    firstName: "carlos",
    lastName: "mendoza",
    nacionality: "United States",
    image: "http://image.com",
    birthday: 2000 - 4 - 24,
  };
  const res = await request(app).post("/directors").send(newArtist);
  id = res.body.id;
  //   console.log(res.body);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newArtist.name);
});

test("PUT /directors/:id debe actualizar un director", async () => {
  const updatedActor = {
    firstName: "eduardo",
  };
  const res = await request(app).put(`/directors/${id}`).send(updatedActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedActor.firstName);
});

// test("POST /directors/:id/genres debe insertar los generos de un actor", async () => {
//   const genre = await Genre.create({
//     name: "drama",
//   });
//   const res = await request(app).post(`/directors/${id}/genres`).send([genre.id]);
//   await genre.destroy();
//   expect(res.status).toBe(200);
//   expect(res.body).toBeInstanceOf(Array);
//   expect(res.body.length).toBe(1);
// });

test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete("/directors/" + id);
  expect(res.status).toBe(204);
});
