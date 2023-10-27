const User = require("../modals/UserModals");
const bcrypt = require("bcrypt");
const jwtProvider = require("../middleware/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("this email already exists", email);
    }

    password = await bcrypt.hash(password, 8);

    const user = await User.create({ firstName, lastName, email, password });

    console.log("user creted", user);

    return user;
  } catch (err) {
    throw new Error(err.Message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw new Error(err.Message);
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found email");
    return user;
  } catch (err) {
    throw new Error(err.Message);
  }
};

const getUserProfileToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFormToken(token);
    const user = await findUserById(userId);

    if (!user) {
      throw new Error("User not found with UserId: ");
    }
  } catch (error) {
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
  getUserByEmail,
  getUserById,
  getUserProfileToken,
  getAllUsers,
};
