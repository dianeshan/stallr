module.exports = app => {
  const reviews = require("../controllers/review.controller.js");

  var router = require("express").Router();

  // Create a new review
  router.post("/", reviews.create);

  // Retrieve all reviews
  router.get("/", reviews.findAll);

  // Retrieve all published reviews
  router.get("/published", reviews.findAllPublished);

  // Retrieve a single review by it's ID
  router.get("/:id", reviews.findOne);

  // Update a review with id
  router.put("/:id", reviews.update);

  // Delete a review with id
  router.delete("/:id", reviews.delete);

  // Delete all reviews
  router.delete("/", reviews.deleteAll);

  app.use("/api/reviews", router);
};