const jwtProvider = require("../middleware/jwtProvider");
const bcrypt = require("bcrypt");
const User = require("../modals/UserModals");

const register = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

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

    const jwt = jwtProvider.generateToken(user._id);

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
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(`User not found email ${email}`);
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
