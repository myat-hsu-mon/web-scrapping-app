const multer = require("multer");
const upload = multer({
  dest: "uploads",
  limits: { fileSize: 2 * 1024 * 1024 }, //2Mb
});

const router = require("express").Router();

const uploadController = require("../controllers/uploadController");

router.post("/", upload.single("csv"), uploadController.uploadFile);

module.exports = router;
