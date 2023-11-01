const Rating = require("../modals/rating.modal");
const productService = require("../services/product.services");

async function createRating(req, user) {
  const product = await productService.findProductById(req.productId);
  const rating = new Rating({
    user: user._id,
    product: product._id,
    rating: req.rating,
    createdAt: new Date(),
  });
  return await rating.save();
}

async function getAllReviews(req, res, productId) {
  const product = await productService.findProductById(req.productId);
  return await Rating.find({ product: productId }).populate("user");
}

module.exports = {
  createRating,
  getAllReviews,
};
