// /***
//  * 
//  * Data Access Object 
//  * ***/
// const database = require('../db/dbconfig');

//  class MovieDao{
   

  
//   findAll(sqlRequest) {
//     return 
// }




//   findAll() {
//     let sqlRequest = "SELECT * FROM car";
//     let dbSearch = new Promise(function (resolve, reject) {
//       database.db.all(sqlRequest, function (err, rows) {
//           if (err) {
//                   throw err;
//           } else if (rows === null || rows.length === 0) {
//               reject(
//                   new DaoError(21, "Entity not found")
//               );
//           } else {
//               resolve(rows);
//           }
//       })
//   });
//     return this.common.findAll(sqlRequest).then(rows => {
//         let cars = [];
//         for (const row of rows) {
//             cars.push(new Movie(row.id, row.maker, row.model, row.year, row.driver));
//         }
//         return cars;
//     });
//   };
//  }


//  module.exports = MovieDao;