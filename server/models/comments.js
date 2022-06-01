const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
