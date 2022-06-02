module.exports = (app) => {
  const reviews = require("../controllers/review.controller.js");

  var router = require("express").Router();

  // Create a new review
  router.post("/", reviews.createReview);

  // Retrieve all reviews
  router.get("/", reviews.findAllReviews);

  router.get("/user-reviews", reviews.findAllUserReviews);

  // Retrieve all published reviews
  router.get("/published", reviews.findAllPublishedReviews);

  // Retrieve a single review by it's ID
  router.get("/:id", reviews.findOneReview);

  // Update a review with id
  router.put("/:id", reviews.updateReview);

  // Delete a review with id
  router.delete("/:id", reviews.deleteReview);

  // Delete all reviews
  router.delete("/", reviews.deleteAllReviews);

  app.use("/api/reviews", router);
};
