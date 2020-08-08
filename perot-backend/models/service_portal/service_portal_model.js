const mongoose = require("mongoose");

const servicePortalSchema = new mongoose.Schema({
  serviceTest: {
    type: String,
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model("ServicePortal", servicePortalSchema);
