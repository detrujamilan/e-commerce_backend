const router = require("express").Router();

const orderController = require("../controlle/order.controller");
const authenticate= require("../middleware/authenticate");

router.post("/", authenticate, orderController.createOrder);
router.get("/user", authenticate, orderController.orderHistory);
router.get("/:id", authenticate, orderController.findOrderById);

module.exports = router;
