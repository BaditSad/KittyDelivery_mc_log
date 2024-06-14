const express = require("express");
const router = express.Router();
module.exports = router;
const Log = require("../models/log");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find().skip(skip).limit(limit);

    const totalLogs = await Log.countDocuments();

    if (!logs) {
      return res.status(404).json({ message: "Not found" });
    }

    if (logs.length === 0) {
      return res.status(201).json({ message: "Empty" });
    }

    res.status(201).json({
      totalPages: Math.ceil(totalLogs / limit),
      logs: logs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const log = new Log(req.body);

    if (!log) {
      return res.status(404).json({ message: "Not found" });
    }

    await log.save();

    res.status(201).json({ message: "Item posted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
