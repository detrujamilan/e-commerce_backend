const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ meassage: "welcome to exoomerce api - node", status: true });
});

const authRouters = require("../src/Routes/auth.route");
app.use("/auth", authRouters);
const userRouters = require("../src/Routes/user.route");
app.use("/users", userRouters);
module.exports = app;
