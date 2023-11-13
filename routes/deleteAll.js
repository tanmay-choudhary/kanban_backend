const express = require("express");
const router = express.Router();
const kanbanModel = require("../models/kanban");

router.delete("/", async (req, res) => {
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
