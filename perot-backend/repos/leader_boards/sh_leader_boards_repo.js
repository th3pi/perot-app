const ShLeaderBoard = require("../../models/leader_boards/sh_leader_board");

class ShLeaderBoardRepo {
  constructor(model) {
    this.model = model;
  }

  create(username, score) {
    const newShLeaderBoard = {
      username,
      score,
    };

    const shLeaderBoard = new this.model(newShLeaderBoard);
    return shLeaderBoard.save();
  }

  getAll() {
    return this.model.find().sort('-score');
  }

  get(username) {
    return this.model.findOne({ username: username });
  }

  update(username, score) {
    return this.model.findOneAndUpdate(
      { username: name },
      {
        username: username,
        score: score,
      }
    );
  }

  delete(username) {
    return this.model.deleteOne({ username: username });
  }
}

module.exports = new ShLeaderBoardRepo(ShLeaderBoard);
