module.exports = (app) => {
  const uploads = require("../controllers/upload.controller.js");

  var router = require("express").Router();

  router.post("/upload", uploads.uploadFiles);

  app.use("/api/uploads", router);
};
