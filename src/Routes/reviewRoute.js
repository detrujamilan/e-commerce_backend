const router = require("express").Router();

const reviewController = require("../controlle/review.controller");
const authenticate= require("../middleware/authenticate");

router.post("/create", authenticate, reviewController.createReview);
router.get("/product/:productId", authenticate, reviewController.getAllReview);


module.exports = router;