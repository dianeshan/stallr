const db = require("../models");
const Review = db.review;

const fs = require("fs/promises");
const path = require("path");

// Create and Save a new review
exports.createReview = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Can't be empty!" });
    return;
  }

  var pathname = req.body.images;
  var filename = pathname.replace(/^C:\\fakepath\\/, "");
  filename = __dirname + "/uploads/" + filename;
  var type = "image/png";

  if (filename.toLowerCase().endsWith(".jpg")) {
    type = "image/jpg";
  } else if (filename.toLowerCase().endsWith(".jpeg")) {
    type = "image/jpeg";
  }

  // Create a review
  const review = new Review({
    user: req.body.user,
    username: req.body.username,
    location: req.body.location,
    description: req.body.description,
    rating: req.body.rating,
    date: Date.now(),
    images: {
      data: await fs.readFile(filename),
      contentType: type,
    },
    published: true,
  });

  // Save review in the database
  review
    .save(review)
    .then((data) => {
      res.send(data);
      // console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating review.",
      });
    });
};

// Retrieve all reviews from the database.
exports.findAllReviews = (req, res) => {
  Review.find()
    .sort({ date: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all reviews.",
      });
    });
};

// Find a single review with an id
exports.findOneReview = (req, res) => {
  const id = req.params.id;

  Review.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "review with id " + id + " not found" });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Review with id " + id });
    });
};

// Update a Review by the id in the request
exports.updateReview = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!",
    });
  }

  const id = req.params.id;

  var pathname = req.body.images;
  var filename = pathname.replace(/^C:\\fakepath\\/, "");
  filename = __dirname + "/uploads/" + filename;
  var type = "image/png";

  if (filename.toLowerCase().endsWith(".jpg")) {
    type = "image/jpg";
  } else if (filename.toLowerCase().endsWith(".jpeg")) {
    type = "image/jpeg";
  }

  Review.findByIdAndUpdate(
    id,
    {
      $set: {
        username: req.body.username,
        location: req.body.location,
        description: req.body.description,
        rating: req.body.rating,
        images: {
          data: await fs.readFile(filename),
          contentType: type,
        },
        published: true,
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update review with id=${id}. Perhaps review not found!`,
        });
      } else res.send({ message: "Review updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating review with id " + id,
      });
    });
};

// Delete a review with the specified id in the request
exports.deleteReview = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete review with id=${id}. Perhaps review not found!`,
        });
      } else {
        res.send({
          message: "Review deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete review with id " + id,
      });
    });
};

// Delete all Reviews from the database.
exports.deleteAllReviews = (req, res) => {
  Review.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Reviews were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all reviews.",
      });
    });
};

exports.findAllUserReviews = (req, res) => {
  Review.find({ username: req.body.username })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving reviews for user.",
      });
    });
};

// Find all published reviews
exports.findAllPublishedReviews = (req, res) => {
  Review.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving all published reviews.",
      });
    });
};
