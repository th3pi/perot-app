const Exhibits = require("../../models/service_portal/exhibits");
const Trivia = require("../../models/trivia/trivia");
const Sh = require("../../models/scavenger_hunts/scavenger_hunts");

class ExhibitsRepo {
  constructor(model) {
    this.model = model;
  }

  /**
   * Creates an exhibit entry
   * @param {String} title Title to be displayed on the exhibit card
   * @param {String} description Description that is displayed on the exhibits page
   * @param {String} name unique identifier name used for
   * @param {Boolean} featured Boolean to determine whether it shows up on the featured section
   * @param {String} location Which level the exhibit is located on
   * @param {String} ages An age range e.g '3-9'
   * @param {String} focus Main field for this exhibit e.g 'engineering'
   */
  create(
    title,
    description,
    name,
    featured,
    location,
    ages,
    focus,
    status,
    image,
    subExhibits,
    flowIndex,
    lastUpdated,
    createdOn
  ) {
    const newExhibit = {
      title,
      description,
      name,
      featured,
      location,
      ages,
      focus,
      status,
      subExhibits,
      flowIndex,
      lastUpdated,
      createdOn,
      image,
    };
    const exhibit = new this.model(newExhibit);
    return exhibit.save();
  }

  /**
   * Returns all exhibits
   */
  getAll() {
    return this.model.find();
  }

  /**
   * Returns featured exhibits
   */
  getFeatured() {
    return this.model.find({ featured: true });
  }

  /**
   * Returns non-featured exhibits
   */
  getOthers() {
    return this.model.find({ featured: false });
  }

  /**
   * Returns the specific exhibit
   * @param {String} name Unique name of the exhibit
   */
  getExhibit(name) {
    return this.model.findOne({ name: name });
  }

  getTrivia(subExhibitName) {
    return Trivia.find({ subExhibitName: subExhibitName });
  }

  getSh(subExhibitName) {
    return Sh.find({ subExhibitName: subExhibitName });
  }

  getRecommendedFlow() {
    return this.model.find({ featured: true }).sort("flowIndex");
  }

  update(
    title,
    description,
    name,
    featured,
    location,
    ages,
    focus,
    status,
    image,
    flowIndex,
    lastUpdated
  ) {
    return this.model.findOneAndUpdate(
      { name: name },
      {
        $set: {
          title: title,
          description: description,
          name: name,
          featured: featured,
          location: location,
          ages: ages,
          focus: focus,
          status: status,
          lastUpdated: lastUpdated,
          image: image,
          flowIndex: flowIndex,
        },
      }
    );
  }
  /**
   * Updates title of the exhibit card
   * @param {String} name Unique name of the exhibit
   * @param {String} title New title for the exhibit card
   */
  updateTitle(name, title) {
    return this.model.findOneAndUpdate(
      { name: name },
      {
        $set: {
          title: title,
          lastUpdated: new Date(),
        },
      }
    );
  }

  /**
   * Updates description of the exhibit
   * @param {String} name Unique name of the exhibit
   * @param {String} description Updated description for the exhibit
   */
  updateDescription(name, description) {
    return this.model.findOneAndUpdate(
      { name: name },
      {
        $set: {
          description: description,
          lastUpdated: new Date(),
        },
      }
    );
  }

  /**
   * Updates the featured status of the exhibit
   * @param {String} name Unique name of the exhibit
   * @param {Boolean} featured Updated featured status of the exhibit
   */
  updateFeatured(name, featured) {
    return this.model.findOneAndUpdate(
      { name: name },
      {
        $set: {
          featured: featured,
          lastUpdated: new Date(),
        },
      }
    );
  }

  /**
   * Updates the status of the exhibit. Status represents if the exhibit would show up to customers
   * @param {String} name Unique name of the exhibit
   * @param {Boolean} status Updates active status of the exhibit
   */
  updateStatus(name, status) {
    return this.model.findOneAndUpdate(
      { name: name },
      {
        $set: {
          status: status,
          lastUpdated: new Date(),
        },
      }
    );
  }

  updateFlow(name, flowIndex) {
    return this.model.findOneAndUpdate(
      {
        name: name,
      },
      {
        $set: {
          flowIndex: flowIndex,
        },
      }
    );
  }

  /**
   * Deletes specified exhibit
   * @param {String} name Unique name of the exhibit
   */
  delete(name) {
    return this.model.deleteOne({ name: name });
  }

  //Creates a subExhibit.
  addSubExhibit(exhibitName, subExhibitName, title, description) {
    const newSubExhibit = {
      name: subExhibitName,
      title: title,
      description: description,
    };
    return this.model.update(
      { name: exhibitName },
      {
        $push: {
          subExhibits: newSubExhibit,
        },
      }
    );
  }

  //Update relevant subExhibit information.
  updateSubExhibit(exhibitName, subExhibitName, title, description) {
    return this.model.update(
      { name: exhibitName, "subExhibits.name": subExhibitName },
      {
        $set: {
          "subExhibits.$.name": subExhibitName,
          "subExhibits.$.title": title,
          "subExhibits.$.description": description,
        },
      }
    );
  }

  getSubExhibits(exhibitName) {
    return this.model.find({ name: exhibitName }).select("subExhibits");
  }

  //Delete a subExhibit.
  deleteSubExhibit(exhibitName, subExhibitName) {
    return this.model.update(
      { name: exhibitName },
      {
        $pull: { subExhibits: { name: subExhibitName } },
      }
    );
  }
}

module.exports = new ExhibitsRepo(Exhibits);
