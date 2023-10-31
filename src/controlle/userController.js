const userService = require("../services/UserServices");

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization.split(" ")[1];
    if (!jwt) {
      return res.status(401).send({ error: "token not found" });
    }
    const user = await userService.getUserProfileToken(jwt);
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = { getAllUser, getUserProfile };
