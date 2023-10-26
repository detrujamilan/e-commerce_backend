const mongoose = require("mongoose");

const userSchames = new mongoose.Schema({
  firstName: {
    type: string,
    required: true,
  },
  lastName: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
  },
  role: {
    type: string,
    required: true,
    default: "CUSTOMER",
  },
  mobile: {
    type: string,
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentINformation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Users = mongoose.model("users", userSchames);

module.exports = Users;
