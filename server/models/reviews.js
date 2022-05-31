const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
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
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
