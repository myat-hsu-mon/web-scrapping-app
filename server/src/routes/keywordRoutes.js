const router = require("express").Router();

const keywordController = require("../controllers/keywordController");

router.get("/:id", keywordController.getKeywordById);

module.exports = router;
