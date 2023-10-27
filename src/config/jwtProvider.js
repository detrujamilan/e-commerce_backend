const jwt = require("jsonwebtoken");

const SECRET_KEY = "asdjashdahdwqhbvdbvkjbkjafhjdhaoudhaeoududhawU";

const genrateToken = async (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

const getUserIdFormToken = async (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { genrateToken, getUserIdFormToken };
