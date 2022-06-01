// const fs = require("fs");
const fs = require("fs/promises");
const path = require("path");
const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Board");
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

exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Cannot be empty!",
    });
  }

  const id = req.params.id;
  console.log(req.body.pfp);

  var pathname = req.body.pfp;
  var filename = pathname.replace(/^C:\\fakepath\\/, "");
  var filename = __dirname + "/uploads/" + filename;
  var type = "image/png";

  if (filename.toLowerCase().endsWith(".jpg")) {
    type = "image/jpg";
  } else if (filename.toLowerCase().endsWith(".jpeg")) {
    type = "image/jpeg";
  }

  User.updateOne(
    { _id: id },
    {
      $set: {
        bio: req.body.bio,
        pfp: {
          data: await fs.readFile(filename),
          contentType: type,
        },
      },
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Perhaps user not found!`,
        });
      } else {
        res.send({ message: "User updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id " + id,
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
