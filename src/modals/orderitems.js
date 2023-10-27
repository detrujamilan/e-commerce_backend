const mongoose = required("mongoose");
const { Schema } = mongoose;

const ordeItemsrSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    requiredd: true,
  },
  discountedPrice: {
    type: Number,
    requiredd: true,
  },
});

const orderItem = mongoose.model("orderItems", ordeItemsrSchema);

module.exports = orderItem;
