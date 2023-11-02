const { createUser } = require("../services/UserServices");
const jwtProvider = require("../middleware/jwtProvider");
const userService = require("../services/UserServices");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    if (user.status === "error") {
      return res.status(400).json({
        status: "failed",
        message: user.message,
      });
    }

    const jwt = jwtProvider.generateToken(user._id);

    await cartService.createCart(user);

    return res
      .status(200)
      .json({ token: jwt, message: "registration successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);

    if (user.status === "error") {
      return res.status(400).json({
        status: "failed",
        message: user.message,
      });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const jwt = await jwtProvider.generateToken(user._id);

    return res.status(200).send({ jwt, message: "login success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { login, register };
