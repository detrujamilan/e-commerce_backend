const router = require("express").Router();

const ratingController = require("../controlle/ratingcontoller");
const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, ratingController.createRating);
router.put("/productId", authenticate, ratingController.getAllRating);

module.exports = router;
