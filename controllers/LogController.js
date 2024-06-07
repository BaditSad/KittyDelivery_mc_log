const express = require("express");
const router = express.Router();
module.exports = router;
const Log = require("../models/log");

router.post("/", async (req, res) => {
  try {
    const log = new Article(req.body);
    if (!log) {
      return res.status(404).json({ message: "Error while adding article!" });
    }
    await log.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});
