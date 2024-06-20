require("dotenv").config();

const logRouter = require("./controllers/LogController");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const allowRequest = require("./middlewares/allowRequest");

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"))
);

app.use(cors());
app.use(bodyParser.json());
app.use(allowRequest);

app.use("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(`💡 Connected to MongoDB!`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit();
  });

app.use("/", logRouter);

app.listen(port, () => {
  console.log(`🚀 App running on http://localhost:${port}`);
});
