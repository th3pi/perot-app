const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  exhibitsVisited: {
    type: [String],
  },
  triviaScore: {
    type: Number,
  },
  shScore: {
    type: Number,
  },
  triviaCorrect: [String],
  triviaIncorrect: [String],
  shItemsAnswered: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
