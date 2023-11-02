const Product = require("../modals/Product.Modal");
const Cart = require("../modals/cart.modal");
const CartItem = require("../modals/cartitem.modal");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (error) {
    return { message: "not create ccart " };
  }
}

const addCartItem = async (userId, item) => {
  try {
    const userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      return { message: "cart not found" };
    }
    const product = await Product.findOne({ _id: item.productId });
    if (!product) {
      return { message: "product not found" };
    }
    const createCart = {
      cart: userCart.id,
      product: product.id,
      sizes: item.sizes,
      quantity: item.quantity,
      price: product.price,
      discountedPrice: (product.price - item.discounte) / 100,
      userId,
    };
    const cartItem = await CartItem.create(createCart);
    const totalCartItems = await CartItem.find();
    let totalPrice = 0;
    totalCartItems.forEach((ele) => {
      totalPrice += ele.price - ele.discountedPrice;
    });
    return await Cart.create({
      user: userId,
      cartItem: cartItem.id,
      totalPrice: totalPrice,
      totalItem: totalCartItems.length,
      totalDiscountedPrice:
        product.price - (product.price * item.discounte) / 100,
      discounte: item.discounte,
    });
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = { createCart, addCartItem };
