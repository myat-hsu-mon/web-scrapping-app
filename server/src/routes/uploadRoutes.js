const multer = require("multer");
const upload = multer({
  dest: "uploads",
  // file size limits 2Mb
  limits: { fileSize: 2 * 1024 * 1024 },
});

const router = require("express").Router();

const uploadController = require("../controllers/uploadController");

router.post("/", upload.single("csv"), uploadController.uploadFile);

module.exports = router;
