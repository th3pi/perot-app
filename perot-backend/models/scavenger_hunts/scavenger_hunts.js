const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  connection: String,
  location: String,
  question: String,
  hints: [String],
  answer: String,
});

const shSchema = new mongoose.Schema({
  shId: String,
  items: {
    type: [itemSchema],
  },
  exhibitName: {
    type: String,
    required: true,
  },
  status: Boolean,
});

module.exports = mongoose.model("SHs", shSchema);
