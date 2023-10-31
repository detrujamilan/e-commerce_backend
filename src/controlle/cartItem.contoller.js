const cartItemService = require("../services/cartitem.services");

const updatedCartItem = async (req, res) => {
  const user = req.user;
  try {
    const updateCartItem = await cartItemService.updateCartItem(
      user._id,
      req.param.id,
      req.body
    );
    return res.status(200).json({ message: "Success cart", updateCartItem });
  } catch (error) {
    return res.status(500).json({ message: "not updatedcartItem" });
  }
};
const removeCartItem = async (req, res) => {
  const user = req.user;
  try {
    const removeCartItem = await cartItemService.removeCartItem(
      user._id,
      req.param.id
    );
    return res
      .status(200)
      .json({ message: " removeCartItem Successfully ", removeCartItem });
  } catch (error) {
    return res.status(500).json({ message: "not updatedcartItem" });
  }
};

module.exports = { updatedCartItem, removeCartItem };
