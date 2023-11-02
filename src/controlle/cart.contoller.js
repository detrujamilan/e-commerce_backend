const cartServices = require("../services/cart.services");

const findUserCart = (req,res) => {
  const user = req.user;
  try {
    const cart = cartServices.findUserCart(user._id);
    return res.status(200).json({ message: "Success cart", cart });
  } catch (error) {
    return res.status(500).json({ message: "",error });
  }
};
const addItemToCart = async (req, res) => {
  const user = res.user;
  try {
    const cartItem = await cartServices.addCartItem(user._id, req.body);
    console.log("cartItem",cartItem);
    return res.status(200).json({ message: "Success cart", cartItem });
  } catch (error) {
    return res.status(500).json({ message: "intrenal server error" });
  }
};

module.exports = { addItemToCart, findUserCart };
