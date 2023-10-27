const { createUser } = require("../services/UserServices");
const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/UserServices");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.services");

const register = async (res, req) => {
  try {
    const user = await createUser(req.body);

    const jwt = jwtProvider.genrateToken(user._id);

    await cartService.createCart(user);

    return res.status(200).send({ token, message: "registration successful" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const login = async (res, req) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found email" });
    }

    const isPasswordValid = await brycpt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const jwt = await jwtProvider.genrateToken(user._id);

    return res.status(200).send({ jwt, message: "login success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { login, register };
