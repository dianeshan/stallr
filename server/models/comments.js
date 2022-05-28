const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
