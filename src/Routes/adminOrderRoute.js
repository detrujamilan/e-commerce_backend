const router = require("express").Router();

const orderController = require("../controlle/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, orderController.getAllOrders);
router.put(
  "/:orderId/confirmed",
  authenticate,
  orderController.confirmedOrders
);
router.put("/:orderId/ship", authenticate, orderController.shipOrders);
router.put("/:orderId/deliver", authenticate, orderController.deliverOrders);
router.put("/:orderId/cancle", authenticate, orderController.cancleOrders);
router.put("/:orderId/delete", authenticate, orderController.deleteOrders);

module.exports = router;
