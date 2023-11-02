const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  discountedPersent: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  size: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  numRatings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ratings"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  creatdAt: {
    type: Date,
    dafault: Date.now(),
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
