const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  joined: {
    type: Date,
    default: Date.now,
  },
});

let Users = mongoose.model("users", usersSchema);
module.exports = Users;
