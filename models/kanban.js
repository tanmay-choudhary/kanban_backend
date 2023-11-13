const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const kanbanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemSchema],
});

const kanbanModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  kanbans: [kanbanSchema],
});

module.exports = mongoose.model("kanbanModel", kanbanModel);
