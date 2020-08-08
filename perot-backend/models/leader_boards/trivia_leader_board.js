const mongoose = require("mongoose");

const triviaLeaderBoard = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("TriviaLeaderBoard", triviaLeaderBoard);
