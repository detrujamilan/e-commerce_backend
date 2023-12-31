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

const PORT = 3001;

app.listen(PORT, () => {
  connetDb();
  console.log("ecommerce listening on port", PORT);
});
