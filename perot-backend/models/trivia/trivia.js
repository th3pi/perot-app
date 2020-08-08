const mongoose = require("mongoose");

//Trivia Schema for use in the subexhibit schema.
const triviaSchema = new mongoose.Schema({
  tId: String,
  subExhibitName: {
    type: String,
    required: true,
  },
  subExhibitTitle: {
    type: String,
  },
  exhibitName: { String },
  question: {
    type: String,
    required: true,
  },
  responses: {
    type: [String],
    required: false,
  },
  correct: {
    type: String,
    required: true,
  },
  status: Boolean,
});

module.exports = mongoose.model("Trivia", triviaSchema);
