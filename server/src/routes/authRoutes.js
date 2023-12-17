const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);


module.exports = router;
