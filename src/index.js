const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { connetDb } = require("./config/db");

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ meassage: "welcome to exoomerce api - node", status: true });
});

const authRouters = require("../src/Routes/auth.route");
app.use("/auth", authRouters);

const userRouters = require("../src/Routes/user.route");
app.use("/api/users", userRouters);

const productRouter = require("../src/Routes/productRoute");
app.use("/api/products", productRouter);

const adminProductRouter = require("./Routes/adminProductRoute");
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./Routes/cartRoute");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./Routes/cartItemRoute");
app.use("/api/cartItem", cartItemRouter);

const orderRouter = require("./Routes/orderRoute");
app.use("/api/order", orderRouter);

const adminOrderRouter = require("./Routes/adminOrderRoute");
app.use("/api/admin/order", adminOrderRouter);

const reviewRouter = require("./Routes/reviewRoute");
app.use("/api/review", reviewRouter);

const ratingRouter = require("./Routes/ratingRoute");
app.use("/api/rating", ratingRouter);

const PORT = 3233;

app.listen(PORT, () => {
  connetDb();
  console.log("ecommerce listening on port", PORT);
});
  