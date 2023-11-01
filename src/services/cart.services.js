const Cart = require("../modals/cart.modal");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (error) {
    return ({ message: "not create ccart " });
  }
}

module.exports = { createCart };
