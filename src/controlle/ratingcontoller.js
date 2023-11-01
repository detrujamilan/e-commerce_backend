const ratingServices = require("../services/rating.services");

const createRating = async (req, res) => {
  const user = req.user;
  try {
    const rating = await ratingServices.createRating(req.body, user);
    return res.status(201).json({ message: "Rating created", rating });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error creating Rating", error: error.message });
  }
};
const getAllRating = async (req, res) => {
  const productId = req.params.productId;
  try {
    const allRating = await ratingServices.getAllReviews(productId);
    return res.status(201).json({ message: "Rating created", allRating });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error creating Rating", error: error.message });
  }
};

module.exports = {
  createRating,
  getAllRating,
};
