const CartItem = require("../modals/cartitem.modal");
const userService = require("../services/UserServices");

async function updateCartItem(res, userId, cartItemId, cartItemDate) {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    const user = await userService.findUserById(item.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemDate.quantity;
      item.price = item.quantity * item.products.price;
      item.discountedPrice = item.quantity * item.products.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      return res
        .status(404)
        .json({ message: "you cant update this cart item" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "not Updated cartItem" });
  }
}

async function removeCartItem(userId, cartItemId, res) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  if (cartItem.userId.toString() === user._id.toString()) {
    await CartItem.findByIdAndDelete(cartItemId);
  } else {
    return res.status(404).json({ message: "user Id not match " });
  }
}

async function findCartItemById(userId, cartItemId, res) {
  const cartItem = await findCartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    return res
      .status(404)
      .json({ message: "cartItemId not found", cartItemId });
  }
}

module.exports = { findCartItemById, removeCartItem, updateCartItem };
