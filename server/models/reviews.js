const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const opts = { toJSON: { virtuals: true } };

const ReviewSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    images: [ImageSchema],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    published: {
      type: Boolean,
      required: true,
    },
  },
  opts
);

module.exports = mongoose.model("Review", ReviewSchema);
