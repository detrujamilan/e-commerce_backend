const router = require("express").Router();

const cartController = require("../controlle/cart.contoller");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);

module.exports = router;
