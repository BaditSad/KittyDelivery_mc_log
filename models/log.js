const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const componentSchema = new Schema({
  log_date: { type: Date, required: true },
  log_message: { type: String, required: true },
});

module.exports = mongoose.model("Component", componentSchema);
