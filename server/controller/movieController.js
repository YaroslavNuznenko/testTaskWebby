const Movie = require("../db/models/movie");
const database = require("../db/dbconfig");
const fs = require("fs");
const path = require("path");
// const movieDao = require('../dao/MovieDao');

class MovieController {
  constructor() {
    // this.movieDao = movieDao;
    // this.success =
  }

  findAll(res) {
    let dbPromise = new Promise((res, rej) => {
      let request = `SELECT * FROM movies`;
      database.db.all(request, (err, rows) => {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      });
    });

    return dbPromise
      .then(rows => {
        let movies = [];
        rows.forEach(row => {
          movies.push(
            new Movie(
              row.title,
              row.release_year,
              row.format,
              row.stars,
              row.id
            )
          );
        });
        return movies;
      })
      .then(movies => res.send(JSON.stringify(movies)))
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: "Something failed!" });
      });
  }

  searchByTitle(req, res) {
    let dbPromise = new Promise((res, rej) => {
      let value = req.query.value;
      let request = `SELECT * FROM movies WHERE title LIKE '%${value}%';`;
      database.db.all(request, (err, rows) => {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      });
    });

    return dbPromise
      .then(rows => {
        let movies = [];
        rows.forEach(row => {
          movies.push(
            new Movie(
              row.title,
              row.release_year,
              row.format,
              row.stars,
              row.id
            )
          );
        });
        return movies;
      })
      .then(movies => res.send(JSON.stringify(movies)))
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: "Something failed!" });
      });
  }

  searchByActor(req, res) {
    let dbPromise = new Promise((res, rej) => {
      let value = req.query.value;
      let request = `SELECT * FROM movies WHERE stars LIKE '%${value}%';`;
      database.db.all(request, (err, rows) => {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      });
    });

    return dbPromise
      .then(rows => {
        let movies = [];
        rows.forEach(row => {
          movies.push(
            new Movie(
              row.title,
              row.release_year,
              row.format,
              row.stars,
              row.id
            )
          );
        });
        return movies;
      })
      .then(movies => res.send(JSON.stringify(movies)))
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: "Something failed!" });
      });
  }

  add(req, res) {
    let movie = new Movie();
    movie.title = req.body.title;
    movie.release_year = req.body.release_year;
    movie.format = req.body.format;
    movie.stars = req.body.stars;

    let dbPromise = new Promise((res, rej) => {
      let sqlRequest =
        "INSERT INTO movies(title, release_year, format, stars) VALUES($title, $release_year, $format, $stars)";
      let sqlParams = {
        $title: movie.title,
        $release_year: movie.release_year,
        $format: movie.format,
        $stars: movie.stars
      };

      database.db.run(sqlRequest, sqlParams, function(err) {
        if (err) {
          rej(err);
        } else {
          res(true);
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      });
    });

    return dbPromise.then(() => res.status(201).send("File added!")).catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something failed!" });
    });
  }

  remove(req, res) {
    let dbPromise = new Promise((res, rej) => {
      let sqlRequest = "DELETE FROM movies WHERE id=$id";
      let sqlParams = { $id: req.body.id };

      database.db.run(sqlRequest, sqlParams, function(err) {
        if (err) {
          rej(err);
        } else {
          res(true);
          console.log(`Row(s) deleted ${this.changes}`);
        }
      });
    });

    return dbPromise
    .then(() => res.status(201).send('Movie removed!'))
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something failed!" });
    });
  }

  upload(req, res) {
    let dbPromise = new Promise((res, rej) => {
      //sorry about this =((
      let file = fs.readFileSync(__basedir + "/routes/movies.txt");
      let utf = file.toString("utf8");
      let matched = utf.match(/(.+?):\s(.+)/gm);
      let obj = {};
      let movies = [];
      matched.forEach((el, i) => {
        let separator = el.indexOf(": ");
        let tmp = [el.slice(0, separator), el.slice(separator + 2)];

        tmp[0] = tmp[0].toLowerCase().replace(" ", "_");
        obj[tmp[0]] = tmp[1].toString();

        if ((i + 1) % 4 === 0) {
          movies.push(obj);
          obj = {};
        }
      });

      let sqlParams = movies.map(m => {
        return (
          "('" +
          m.title +
          "', '" +
          m.release_year +
          "', '" +
          m.format +
          "', '" +
          m.stars +
          "')"
        );
      });
      let placeholders = sqlParams.join(", ");
      let sqlRequest =
        "INSERT INTO movies(title, release_year, format, stars) VALUES" +
        placeholders +
        ";";

      database.db.run(sqlRequest, [], function(err) {
        if (err) {
          rej(err);
        } else {
          res(true);
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      });
    });
    return dbPromise.then(() => res.status(201).send('File uploaded!')).catch(err => {
      console.log(err);
      res.status(500).send({ error: "Something failed!" });
    });
  }
}

module.exports = MovieController;
