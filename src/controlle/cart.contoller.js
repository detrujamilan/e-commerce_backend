const cartServices = require("../services/cart.services");

const findUserCart = (res) => {
  const user = res.user;
  try {
    const cart = cartServices.findUserCart(user._id);
    return res.status(200).json({ message: "Success cart", cart });
  } catch (error) {
    return res.status(500).json({ message: "" });
  }
};
const addItemToCart = (req, res) => {
  const user = res.user;
  try {
    const cartItem = cartServices.addCartItem(user._id, req);
    return res.status(200).json({ message: "Success cart", cartItem });
  } catch (error) {
    return res.status(500).json({ message: "" });
  }
};

module.exports = { addItemToCart, findUserCart };
