const mongoose = require("mongoose");

const spoonerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  spoonerName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Spooner = mongoose.model("Spooner", spoonerSchema);

module.exports = Spooner;
