const router = require("express").Router();

const productController = require("../controlle/product.contoller");
// const authenticate= require("../middleware/authenticate");

router.post("/", productController.creatProduct);
router.post("/create", productController.createMultipleProducts);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);


module.exports = router;
