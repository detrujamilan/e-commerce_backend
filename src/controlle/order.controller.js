const orderService = require("../services/order.services");

const createOrder = async (req, res) => {
  const user = req.user;
  try {
    const createdOrder = await orderService.createOrder(user, req.body);
    return res
      .status(200)
      .json({ message: "ordercreat successfully ", createdOrder });
  } catch (error) {
    return res.status(500).json({ message: "not createdOrder" });
  }
};

const findOrderById = async (req, res) => {
  const user = req.user;
  try {
    const findOrderId = await orderService.findOrderById(user, req.params.id);
    return res
      .status(200)
      .json({ message: "ordercreat successfully ", findOrderId });
  } catch (error) {
    return res.status(500).json({ message: "not createdOrder" });
  }
};
const orderHistory = async (req, res) => {
  const user = req.user;
  try {
    const orderHistory = await orderService.userOrderHistory(
      user._id,
      req.params.id
    );
    return res
      .status(200)
      .json({ message: "ordercreat successfully ", orderHistory });
  } catch (error) {
    return res.status(500).json({ message: "not createdOrder" });
  }
};

module.exports = { orderHistory, createOrder, findOrderById };
