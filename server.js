const logRouter = require("./controllers/LogController");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3009;

app.use(cors());

const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//Ici on envoit les infos vers le front

app.use(bodyParser.json());

app.use("/", logRouter);

app.listen(port, () => console.log(`app running on http://localhost:${port}`));
