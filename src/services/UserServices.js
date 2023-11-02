const User = require("../modals/UserModals");
const bcrypt = require("bcrypt");
const jwtProvider = require("../middleware/jwtProvider");



const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found for userId: ${userId}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileToken = async (token) => {
  try {
    const userId = await jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);
    if (!user) {
      throw new Error(`User not found with userId: ${userId}`);
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserProfileToken,
  getAllUsers,
};
