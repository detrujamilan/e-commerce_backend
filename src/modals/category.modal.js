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
  level: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("categories", categoryScheme);
module.exports = Category;
