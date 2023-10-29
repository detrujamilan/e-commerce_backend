const mongoose = require("mongoose");
require("dotenv").config();
const connetDb = async () => {
  await mongoose.connect(process.env.DB);
  console.log("connect");
};
module.exports = { connetDb };
