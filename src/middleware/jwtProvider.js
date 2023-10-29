const jwt = require("jsonwebtoken");

const SECRET_KEY = "iadiashdioashdiuahdiaudhiasuoh";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, getUserIdFromToken };