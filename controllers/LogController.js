const express = require("express");
const router = express.Router();
module.exports = router;
const Log = require("../models/log");

router.get("/connection", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find({ log_type: "connection" })
      .skip(skip)
      .limit(limit);

    const totalLogs = await Log.countDocuments({ log_type: "connection" });

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

router.get("/download", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find({ log_type: "download" })
      .skip(skip)
      .limit(limit);

    const totalLogs = await Log.countDocuments({ log_type: "download" });

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

router.get("/disconnection", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find({ log_type: "disconnection" })
      .skip(skip)
      .limit(limit);

    const totalLogs = await Log.countDocuments({ log_type: "disconnection" });

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
