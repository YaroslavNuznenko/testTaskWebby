const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./mydb.db");

let init = () =>{
  // db.run(
  //   "DROP TABLE movies;"
  // );
  db.run(
    "CREATE TABLE if not exists movies(\
    id integer PRIMARY KEY AUTOINCREMENT,\
    title text NOT NULL UNIQUE,\
    release_year text NOT NULL,\
    format text NOT NULL,\
    stars text NOT NULL)"
  );
//   db.run(
//   `INSERT INTO movies(title, release_year, format, stars) VALUES(?, ?, ?, ?)`,
//   ["Batman", "2007", "DVD", "Christian Bale, Mark Strong"],
//   function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
//   }
// );
// db.run(
//   `INSERT INTO movies(title, release_year, format, stars) VALUES(?, ?, ?, ?)`,
//   ["Batwoman", "2017", "DVD", "Mark Strong, Emma Stone"],
//   function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
//   }
// );

}


module.exports = {
  init: init,
  db: db
}
