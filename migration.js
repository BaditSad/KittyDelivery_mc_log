var mongoose = require("mongoose");
var Log = require("./models/log");

var mongoDB = "mongodb://mongo:27017/kittydelivery";
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

db.once("open", async function () {
  console.log("Connected to MongoDB");

  try {
    await Log.deleteMany({});
    console.log("Logs collection cleared");

    let logs = [
      {
        log_date: randomDate(new Date(2022, 0, 1), new Date()),
        log_type: "connexion",
        log_message: "User connected to the system",
      },
      {
        log_date: randomDate(new Date(2022, 0, 1), new Date()),
        log_type: "download",
        log_message: "User downloaded a report",
      },
      {
        log_date: randomDate(new Date(2022, 0, 1), new Date()),
        log_type: "connexion",
        log_message: "User connected to the system",
      },
      {
        log_date: randomDate(new Date(2022, 0, 1), new Date()),
        log_type: "download",
        log_message: "User downloaded a report",
      },
    ];

    await Log.insertMany(logs);
    console.log("Logs inserted successfully");
  } catch (err) {
    console.error("Error inserting logs:", err);
  } finally {
    mongoose.connection.close();
  }
});
