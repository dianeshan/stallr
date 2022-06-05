const db = require("../models");
const Review = db.review;
const Comment = db.comment;

// Create and Save a new comment
exports.createComment = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Can't be empty!" });
    return;
  }

  const comment = new Comment({
    username: req.body.username,
    message: req.body.message,
    date: Date.now(),
  });

  // Save comment in the database
  comment
    .save(comment)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating comment.",
      });
    });

  const id = req.body.id;
  Review.updateOne({ _id: id }, { $addToSet: { comments: comment } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add comment to review with id=${id}. Perhaps review not found!`,
        });
      } else res.send({ message: "Added comment successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error adding comment to review with id " + id,
      });
    });
};

exports.getComment = async (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Could not find comment with id " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not get comment with id " + id,
      });
    });
};

exports.deleteComment = async (req, res) => {
  const id = req.params.id;
  const commentId = req.body.data;
  await Review.findByIdAndUpdate(id, { $pull: { comments: commentId } });

  Comment.findByIdAndRemove(commentId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete comment with id=${commentId}. Perhaps comment not found!`,
        });
      } else {
        res.send({
          message: "Comment deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Could not delete comment with id " + commentId,
      });
    });
};
