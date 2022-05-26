const mongoose = require("mongoose");
const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
      username: String,
      message: String,
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    })
);
module.exports = Comment;