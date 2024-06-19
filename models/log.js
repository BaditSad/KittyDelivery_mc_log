const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  log_date: { type: Date, required: true },
  log_type: { type: String, required: true },
  log_message: { type: String, required: true },
});

module.exports = mongoose.model("Log", logSchema);
