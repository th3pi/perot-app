const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema({
  title: String,
  id: {
    type: String,
    unique: true,
  },
  description: String,
  date: String,
  image: String,
  status: Boolean,
});

module.exports = mongoose.model("Announcement", announcementSchema);
