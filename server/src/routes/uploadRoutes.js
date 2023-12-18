const multer = require("multer");
const upload = multer({ dest: "uploads" });

const router = require("express").Router();

const uploadController = require("../controllers/uploadController");

router.post("/", upload.single("csv"), uploadController.uploadFile);

module.exports = router;
