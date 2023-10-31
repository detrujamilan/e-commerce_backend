const { create } = require("../modals/UserModals");
const Category = require("../modals/category.modal");
const Product = require("../modals/Product.Modal");

async function createProduct(req, res) {
  const topLevel = await Category.findeOne({ user: req.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: req.topLevelCategory,
      lavel: 1,
    });
  }
  let secoundLevel = await Category.findeOne({
    name: req.secoundLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secoundLevel) {
    secoundLevel = new Category({
      name: req.secoundLevelCategory,
      parentCategory: topLevel._id,
      lavel: 2,
    });
  }
  let thirderLevel = await Category.findeOne({
    name: req.thirdLevelCategory,
    parentCategory: secoundLevel._id,
  });
  if (!thirderLevel) {
    thirderLevel = new Category({
      name: req.thirdLevelCategory,
      parentCategory: secoundLevel._id,
      lavel: 3,
    });
  }

  const product = new Product({
    title: req.title,
    color: req.color,
    description: req.description,
    discountedPrice: req.discountedPrice,
    discountedPersent: req.discountedPersent,
    brand: req.brand,
    imageUrl: req.imageUrl,
    quantity: req.quantity,
    price: req.price,
    size: req.size,
    size: thirderLevel._id,
  });

  return await product.save();
}

async function deleteProduct(productId, res) {
  const product = await findProductById(productId);
  await product.findByIdAndDelete(productId);
  return res.status(200).json({ message: "Product deleted successfully" });
}
