const Movie = require("./Movie");
const Genre = require("./Genre");
const Director = require("./Director");
const Actor = require("./Actor");

Genre.belongsToMany(Movie, { through: "movies_genres" });
Movie.belongsToMany(Genre, { through: "movies_genres" });

Actor.belongsToMany(Movie, { through: "movies_actors" });
Movie.belongsToMany(Actor, { through: "movies_actors" });

Director.belongsToMany(Movie, { through: "movies_directors" });
Movie.belongsToMany(Director, { through: "movies_directors" });
