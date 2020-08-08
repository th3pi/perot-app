const Trivia = require("../../models/trivia/trivia");

class TriviaRepo {
  constructor(model) {
    this.model = model;
  }

  create(
    tId,
    exhibitName,
    subExhibitTitle,
    subExhibitName,
    question,
    responses,
    correct,
    status
  ) {
    const newTrivia = {
      tId,
      exhibitName,
      subExhibitTitle,

      subExhibitName,
      question,
      responses,
      correct,
      status,
    };

    const trivia = new this.model(newTrivia);
    return trivia.save();
  }

  getAll() {
    return this.model.find();
  }

  get(tId) {
    return this.model.findOne({ tId: tId });
  }

  getStatus(status) {
    return this.model.find({ status: status });
  }

  getForExhibit(exhibitName) {
    return this.model.find({ exhibitName: exhibitName });
  }

  getForSubExhibit(subExhibitName) {
    return this.model.find({ subExhibitName: subExhibitName });
  }

  updateStatus(tId, status) {
    return this.model.findOneAndUpdate(
      { tId: tId },
      {
        $set: {
          status: status,
        },
      }
    );
  }

  update(
    tId,
    exhibitName,
    subExhibitTitle,
    subExhibitName,
    question,
    responses,
    correct,
    status
  ) {
    return this.model.findOneAndUpdate(
      { tId: tId },
      {
        exhibitName: exhibitName,
        subExhibitTitle: subExhibitTitle,
        subExhibitName: subExhibitName,
        question: question,
        responses: responses,
        correct: correct,
        status: status,
      }
    );
  }

  delete(tId) {
    return this.model.deleteOne({ tId: tId });
  }
}

module.exports = new TriviaRepo(Trivia);
