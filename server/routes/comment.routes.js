module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // Create a new comment
  router.post("/", comments.createComment);

  // Get a comment with id
  router.get("/:id", comments.getComment);

  // Delete a comment with id
  router.delete("/:id", comments.deleteComment);

  app.use("/api/comments", router);
};
