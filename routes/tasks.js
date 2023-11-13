const express = require("express");
const router = express.Router();
const kanbanModel = require("../models/kanban");

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { kanbans } = req.body;

    // Use findByIdAndUpdate for a more concise update
    const kanban = await kanbanModel.findByIdAndUpdate(
      id,
      { kanbans },
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
module.exports = router;
