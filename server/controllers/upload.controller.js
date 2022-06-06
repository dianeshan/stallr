const upload = require("../middlewares/uploadImages");
require("dotenv").config({ path: "../config.env" });
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    // console.log(req.file);

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
