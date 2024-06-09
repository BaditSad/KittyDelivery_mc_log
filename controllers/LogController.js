const express = require("express");
const router = express.Router();
module.exports = router;
const Log = require("../models/log");

router.post("/", async (req, res) => {
  try {
    const log = new Log(req.body);
    if (!log) {
      return res.status(404).json({ message: "Error while posting log!" });
    }
    await log.save();
    res.status(201).send(log);
  } catch (error) {
    res.status(400).send(error);
  }
});
