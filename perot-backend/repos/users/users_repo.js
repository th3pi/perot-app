const User = require("../../models/users/users");

class UserRepo {
  constructor(model) {
    this.model = model;
  }

  create(username, exhibitsVisited, triviaScore, shScore, shItemsAnswered) {
    const newUser = {
      username,
      exhibitsVisited,
      triviaScore,
      shScore,
      shItemsAnswered,
    };

    const user = new this.model(newUser);
    return user.save();
  }

  getAll() {
    return this.model.find();
  }

  get(username) {
    return this.model.findOne({ username: username });
  }
  //TODO: this should either be find, or findone, maybe need to fix later
  getShItems(shItemsAnswered) {
    return this.model.find({ shItemsAnswered: shItemsAnswered });
  }

  addShItemsAnswered(username, shItemId) {
    return this.model.updateOne(
      { username: username },
      {
        $push: {
          shItemsAnswered: shItemId,
        },
      }
    );
  }

  addExhibitsVisited(username, exhibitVisited) {
    return this.model.updateOne(
      { username: username },
      {
        $push: {
          exhibitsVisited: exhibitVisited,
        },
      }
    );
  }

  addTriviaCorrect(username, tId) {
    return this.model.updateOne(
      {
        username: username,
      },
      {
        $push: {
          triviaCorrect: tId,
        },
      }
    );
  }

  addTriviaIncorrect(username, tId) {
    return this.model.updateOne(
      {
        username: username,
      },
      {
        $push: {
          triviaIncorrect: tId,
        },
      }
    );
  }

  update(username, triviaScore, shScore, shItemsAnswered) {
    return this.model.findOneAndUpdate(
      { username: username },
      {
        username: username,
        triviaScore: triviaScore,
        shScore: shScore,
        shItemsAnswered: shItemsAnswered,
      }
    );
  }

  delete(username) {
    return this.model.deleteOne({ username: username });
  }
}

module.exports = new UserRepo(User);
