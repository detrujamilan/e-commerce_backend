const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const cartItem = mongoose.model("addresses", cartItemSchema);
module.exports = cartItem;
