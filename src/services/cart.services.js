const Cart = require("../modals/cart.modal");

async function createCart(req, res, user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (error) {
    return res.status(501).json({ message: "not create ccart " });
  }
}

module.exports = { createCart };
