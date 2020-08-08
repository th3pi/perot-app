const mongoose = require("mongoose");
const faqSchema = new mongoose.Schema({
  question: String,
  id: {
    type: String,
    unique: true,
  },
  answer: String,
});

module.exports = mongoose.model("FAQ", faqSchema);
