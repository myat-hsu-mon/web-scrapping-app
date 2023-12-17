const router = require("express").Router();

const userController = require("../controllers/userController");

router.get("/:id/keywords", userController.getKeywordsByUserId);

module.exports = router;
