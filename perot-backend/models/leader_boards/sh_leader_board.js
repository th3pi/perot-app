const mongoose = require("mongoose");

const shLeaderBoard = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("ShLeaderBoard", shLeaderBoard);
