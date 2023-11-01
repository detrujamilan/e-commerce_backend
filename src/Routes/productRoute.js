const router = require("express").Router();

const productController = require("../controlle/product.contoller");
const authenticate= require("../middleware/authenticate");

router.get("/", authenticate, productController.getAllProducts);
router.post("/id/:id", authenticate, productController.findProductById);

module.exports = router;
