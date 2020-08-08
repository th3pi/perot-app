const mongoose = require("mongoose");

//SubExhibit schema, will be nested into exhibit schema.
const subExhibitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//Exhibit Schema holds exhibit information and access to subExhibit, which control trivia
const exhibitsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  featured: {
    type: Boolean,
    required: true,
    unique: false,
    default: false,
  },
  location: {
    type: String,
    required: true,
    unique: false,
  },
  ages: {
    type: String,
    required: true,
    unique: false,
  },
  focus: {
    type: String,
    required: true,
    unique: false,
  },
  status: {
    type: Boolean,
    required: false,
    unique: false,
    default: true,
  },
  lastUpdated: {
    type: Date,
    required: false,
    unique: false,
  },
  createdOn: {
    type: Date,
    required: false,
    unique: false,
  },
  image: {
    type: String,
  },
  subExhibits: {
    type: [subExhibitsSchema],
  },
  flowIndex: { type: Number, unique: true },
});

module.exports = mongoose.model("Exhibits", exhibitsSchema);
