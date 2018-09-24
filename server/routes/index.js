let multer = require("multer");
let upload = multer();

const MovieController = require("../controller/movieController");
const movieController = new MovieController();

// const app = express();
module.exports = app => {
  app.get("/api/movies", (req, res) => {
    movieController.findAll(res);
  });

  app.post("/api/add", (req, res) => {
    movieController.add(req, res);
  });

  app.get("/api/search/title", (req, res) => {
    movieController.searchByTitle(req, res);
  });

  app.get("/api/search/actor", (req, res) => {
    movieController.searchByActor(req, res);
  });

  app.post("/api/upload", (req, res) => {
    // movieController.add(req, res);
    // let err 
    if (!req.files) return res.status(400).send("No files were uploaded.");
    let mimeType = "text/plain";
    let textFile = req.files.text;

    if (textFile.mimetype !== mimeType)
      return res.status(500).send("Unknown file type!!");

    textFile.mv(__dirname + "/movies.txt", function(err) {
      if (err) return res.status(500).send(err);
      movieController.upload(req, res);
    });
  });

  app.post("/api/remove", (req, res) => {
    movieController.remove(req, res);
  });
};
