module.exports = (app) => {
  const uploads = require("../controllers/upload.controller.js");

  var router = require("express").Router();

  router.post("/upload", uploads.uploadFiles);
  router.get("/files", uploads.getListFiles);
  router.get("/files/:name", uploads.download);

  app.use("/api/uploads", router);
};
