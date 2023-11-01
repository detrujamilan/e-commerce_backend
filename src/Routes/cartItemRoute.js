const router = require("express").Router();

const cartItemController = require("../controlle/cartItem.contoller");
const authenticate = require("../middleware/authenticate");

router.put("/:id", authenticate, cartItemController.updatedCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

module.exports = router;