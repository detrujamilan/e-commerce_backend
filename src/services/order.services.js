const Address = require("../modals/address.modal");
const Order = require("../modals/order.modal");
const cartServices = require("../services/cart.services");

async function createOrder(user, shipAddress) {
  let address;

  if (shipAddress._id) {
    let existAddress = await Address.findById(shipAddress._id);
    address = existAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();

    user.address.push(address);
    await user.save();
  }
  const cart = await cartServices.finduserCart(user._id);
  const orderItems = [];
  for (const item of cart.orderItems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItems.save();
    orderItem.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shipAddress: address,
  });

  const saveOrder = await createOrder.save();
  return saveOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails = "COMPLE";

  return await order.save();
}
async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "COMFIRM";

  return await order.save();
}
async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPING";

  return await order.save();
}
async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DILIVER";

  return await order.save();
}
async function cancleOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "cancle";

  return await order.save();
}
async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}
async function userOrderHistory(userId, res) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    res.status(500).json({ error: "orderHistory" });
  }
}
async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}
async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancleOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
