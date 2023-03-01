const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

let Exercise = mongoose.model("exercise", exerciseSchema);
module.exports = Exercise;
