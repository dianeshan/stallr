const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.findAllUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all users.",
      });
    });
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!",
    });
  }

  const id = req.params.id;

  User.updateOne(
    { _id: id },
    { $set: { bio: req.body.bio } },
    { new: true, upsert: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Perhaps user not found!`,
        });
      } else res.send({ message: "User updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id " + id,
      });
    });
};
