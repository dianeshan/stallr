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
});

module.exports = mongoose.model("Comment", CommentSchema);
