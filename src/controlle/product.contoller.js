const productService = require("../services/product.services");

const creatProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "not createdOrder" });
  }
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deleteProduct = await productService.deleteProduct(productId);
    return res
      .status(201)
      .json({ message: "Product delete successfully", deleteProduct });
  } catch (error) {
    return res.status(500).json({ message: "not createdOrder" });
  }
};
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const updateProduct = await productService.updateProduct(
      productId,
      req.body
    );
    return res
      .status(201)
      .json({ message: "Product updated successfully", updateProduct });
  } catch (error) {
    return res.status(500).json({ message: "not updatedProduct" });
  }
};
const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const findProductId = await productService.findProductById(productId);
    return res
      .status(201)
      .json({ message: "find Product successfully", findProductId });
  } catch (error) {
    return res.status(500).json({ message: "not findProductId" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const getAllProduct = await productService.getAllProducts(req.query);
    return res
      .status(201)
      .json({ message: "find AllProduct successfully", getAllProduct });
  } catch (error) {
    return res.status(500).json({ message: "no Products Found " });
  }
};
const createMultipleProducts = async (req, res) => {
  try {
    const createMultiProduct = await productService.createMultipleProduct(
      req.query
    );
    return res
      .status(201)
      .json({ message: "createMultiProduct successfully", createMultiProduct });
  } catch (error) {
    return res.status(500).json({ message: "no Products Found" });
  }
};

module.exports = {
  creatProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProducts,
};
