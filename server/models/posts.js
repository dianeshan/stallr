const mongoose = require("mongoose");
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    username: String,
    location: String,
    review: String,
    rating: Number,
    photos:
    {
        data: Buffer,
        contentType: String
    }
  })
);
module.exports = Post;