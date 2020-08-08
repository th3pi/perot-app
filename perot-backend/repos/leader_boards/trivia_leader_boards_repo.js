const TriviaLeaderBoard = require("../../models/leader_boards/trivia_leader_board");

class TriviaLeaderBoardRepo {
  constructor(model) {
    this.model = model;
  }

  create(username, score) {
    const newTriviaLeaderBoard = {
      username,
      score,
    };

    const triviaLeaderBoard = new this.model(newTriviaLeaderBoard);
    return triviaLeaderBoard.save();
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

module.exports = new TriviaLeaderBoardRepo(TriviaLeaderBoard);
