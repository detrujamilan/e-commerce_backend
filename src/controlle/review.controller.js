const createview = require("../services/review.services");

const createReview = async (req, res) => {
  const user = req.user;
  try {
    const review = await createview.createReview(req.body, user);
    return res
      .status(201)
      .json({ message: "succesfully create review ", review });
  } catch (error) {
    return res.status(500).json({ message: "not createReview" });
  }
};
const getAllReview = async (req, res) => {
  const productId = req.params.productId;
  try {
    const allReview = await createview.getAllReviews(productId);
    return res.status(201).json({ message: "succesfully ", allReview });
  } catch (error) {
    return res.status(500).json({ message: "not createReview" });
  }
};

module.exports = {
  createReview,
  getAllReview,
};
