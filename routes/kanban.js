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
    const { id } = req.params;
    const { name, description } = req.body;

    // Use findByIdAndUpdate for a more concise update
    const kanban = await kanbanModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!kanban) {
      // If the kanban with the specified ID is not found
      return res.status(404).json({ error: "Kanban not found" });
    }

    res.json(kanban);
  } catch (err) {
    // Handle validation errors or other errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedKanban = await kanbanModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedKanban) {
      return res.status(404).json({ message: "Kanban entry not found" });
    }

    res.json({ message: "Kanban entry deleted successfully", deletedKanban });
  } catch (err) {
    res.status(500).send("Error deleting Kanban entry: " + err);
  }
});

router.delete("/all", async (req, res) => {
  try {
    // Delete all kanban entries
    const result = await kanbanModel.deleteMany({});

    // Check if any entries were deleted
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No kanban entries found to delete" });
    }

    res.json({ message: "All kanban entries deleted successfully" });
  } catch (err) {
    res.status(500).send("Error deleting kanban entries: " + err);
  }
});
module.exports = router;
