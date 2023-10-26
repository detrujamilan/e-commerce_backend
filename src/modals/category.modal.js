const mongoose = require("mongoose");

const categoryScheme = mongoose.Schema({
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const category = mongoose.model("categories", categoryScheme);
module.exports = category;
