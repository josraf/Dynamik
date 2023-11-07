const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  nickname: {
    required: true,
    type: String,
  },
  birth_date: {
    required: true,
    type: Date,
  },
  stack: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
