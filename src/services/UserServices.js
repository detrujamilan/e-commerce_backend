const User = require("../modals/UserModals");
const bcrypt = require("bcrypt");
const jwtProvider = require("../middleware/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error(`this email already exists ${email}`);
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return user;
  } catch (err) {
    return { message: err.message, status: "error" };
  }
};

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
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User not found email ${email}`);
    }
    return user;
  } catch (err) {
    return { message: err.message, status: "error" };
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
  getUserByEmail,
  findUserById,
  getUserProfileToken,
  getAllUsers,
};
