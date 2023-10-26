const mongoose = required("mongoose");
const { Schema } = mongoose;

const ordeItemsrSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItems",
    },
  ],
  orderData: {
    type: Date,
    required: true,
  },
  deliveryDate: {
    type: Date,
  },
  shippingAdress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
  },
  paymentDetails: {
    paymentMethod: {
      tyep: String,
    },
    transationId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
  },
  totalPrice: {
    type: Number,
    requiredd: true,
  },
  totalDiscountedPrice: {
    type: Number,
    requiredd: true,
  },
  discount: {
    type: Number,
    requiredd: true,
  },
  orderStatus: {
    type: String,
    requiredd: true,
    default: "PENDING",
  },
  totalItem: {
    type: Number,
    requiredd: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderItem = mongoose.model("orderItems", ordeItemsrSchema);

module.exports = orderItem;
