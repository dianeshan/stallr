const db = require("../models");
const Review = db.review;
const Comment = db.comment;

// Create and Save a new comment
exports.createComment = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Can't be empty!" });
    return;
  }

  const review = await Review.findById(req.params.id);

  const comment = new Comment(req.body.comment);
  comment.date = Date.now();
  comment.username = req.user.username;
  review.comments.push(comment);

  // Save comment in the database
  comment
    .save(comment)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating comment.",
      });
    });
};

exports.deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  await Review.findByIdAndUpdate(id, { $pull: { comments: commentId } });

  Comment.findByIdAndRemove(commentId, { useFindAndModify: false })
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
        message: "Could not delete comment with id " + commentId,
      });
    });
};
