const db = require("../models");
const User = db.user;

exports.adminBoard = (req, res) => {
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

exports.addFriend = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;

  User.updateOne({ _id: id }, { $addToSet: { friends: req.body } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add friend to user with id=${id}. Perhaps user not found!`,
        });
      } else res.send({ message: "Added friend successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error adding friend to user with id " + id,
      });
    });
};

exports.findAllFriends = (req, res) => {
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
  console.log(req.body.bio);

  const id = req.params.id;

  User.updateOne(
    { _id: id },
    { $set: req.body },
    {
      returnDocument: "after",
    }
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
