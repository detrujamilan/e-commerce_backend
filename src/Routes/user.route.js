const express = require("express");

const router = express.Router();

const userController = require("../controlle/userController");

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUser);


module.exports = router;