const upload = require("../middlewares/upload");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
require("dotenv").config({ path: "../config.env" });

const url = process.env.ATLAS_URI;
const baseUrl = "http://localhost:3000/api/uploads/files/";
const mongoClient = new MongoClient(url);

exports.uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
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
  try {
    await mongoClient.connect();
    const database = mongoClient.db("toilets");
    const images = database.collection(process.env.IMG_BUCKET + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
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
