const upload = require("../middlewares/uploadImages");
require("dotenv").config({ path: "../config.env" });
const fs = require("fs");

const url = "http://localhost:3000/server/public/";

exports.uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);

    if (req.file === undefined) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });
  }
};

exports.getListFiles = async (req, res) => {
  const path = url;

  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Files not found.",
      });
    }

    let filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        url: url + file,
      });
    });

    res.status(200).send(filesList);
  });
};

exports.download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("toilets");
    const bucket = new GridFSBucket(database, {
      bucketName: process.env.IMG_BUCKET,
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
