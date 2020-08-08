const SH = require("../../models/scavenger_hunts/scavenger_hunts");

class ShRepo {
  constructor(model) {
    this.model = model;
  }

  create(shId, item, exhibitName, status) {
    const newSh = {
      shId,
      item,
      exhibitName,
      status,
    };

    const sh = new this.model(newSh);
    return sh.save();
  }

  addItem(shId, name, connection, location, question, hints, answer) {
    const newItem = {
      name: name,
      connection: connection,
      location: location,
      question: question,
      hints: hints,
      answer: answer,
    };
    return this.model.update(
      { shId: shId },
      {
        $push: {
          items: newItem,
        },
      }
    );
  }

  getAll() {
    return this.model.find();
  }

  get(shId) {
    return this.model.findOne({ shId: shId });
  }

  getStatus(status) {
    return this.model.find({ status: status });
  }

  getForExhibit(exhibitName) {
    return this.model.find({ exhibitName: exhibitName });
  }

  update(shId, exhibitName) {
    return this.model.findOneAndUpdate(
      { shId: shId },
      {
        shId: shId,
        exhibitName: exhibitName,
      }
    );
  }

  updateStatus(shId, status) {
    return this.model.findOneAndUpdate(
      { shId: shId },
      {
        $set: {
          status: status,
        },
      }
    );
  }

  updateItem(shId, name, connection, location, question, hints, answer) {
    return this.model.update(
      { shId: shId, "items.name": name },
      {
        $set: {
          "items.$.connection": connection,
          "items.$.location": location,
          "items.$.question": question,
          "items.$.hints": hints,
          "items.$.answer": answer,
        },
      }
    );
  }

  deleteItem(shId, name) {
    return this.model.update(
      { shId: shId },
      {
        $pull: { items: { name: name } },
      }
    );
  }

  delete(shId) {
    return this.model.deleteOne({ shId: shId });
  }
}

module.exports = new ShRepo(SH);
