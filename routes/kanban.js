const express = require("express");
const router = express.Router();
const kanbanModel = require("../models/kanban");

router.get("/", async (req, res) => {
  try {
    const kanban = await kanbanModel.find();
    res.json(kanban);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const kanban = await kanbanModel.findById(req.params.id);
    res.json(kanban);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const kanban = new kanbanModel({
    name: req.body.name,
    description: req.body.description,
    kanbans: req.body.kanbans,
  });

  try {
    const a1 = await kanban.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const kanban = await kanbanModel.findById(req.params.id);
    kanban.sub = req.body.sub;
    const a1 = await kanban.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

module.exports = router;
