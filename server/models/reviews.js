const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts =
  ("toJSON",
  function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

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
      default: Date.now(),
    },
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
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
  { timestamps: true },
  opts
);

module.exports = mongoose.model("Review", ReviewSchema);
