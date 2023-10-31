const Review = require("../modals/review");
const productServices = require("../services/product.services");

async function createReview(req, res, user) {
  const product = await productServices.findProductById(req.productId);

  const review = new Review({
    user: user._id,
    product: product._id,
    review: product.review,
    createdAt: new Date(),
  });
  await product.save();
  return await review.save();
}

async function getAllReviews(req, res, productId) {
  const product = await productServices.findProductById(req.productId);
  return await Review.find({ product: productId }).populate("user");
}

module.exports = {
  createReview,
  getAllReviews,
};
