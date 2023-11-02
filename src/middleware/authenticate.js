const jwtProvider = require("../middleware/jwtProvider");
const userServices = require("../services/UserServices");

const authenticate = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    const userId = await jwtProvider.getUserIdFromToken(token);

    const user = await userServices.findUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Token process invalid", error: error.message });
  }
  next();
};

module.exports = authenticate;