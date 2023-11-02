const orderService = require("../services/order.services");

const createOrder = async (req, res) => {
  const user = req.user;
  console.log("user", user);
  try {
    const createdOrder = await orderService.createOrder(user, req.body);
    console.log("createdOrder", createdOrder)
    return res
      .status(200)
      .json({ message: "ordercreat successfully ", createdOrder });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "not successfully order" });
  }
};

const findOrderById = async (req, res) => {
  const user = req.user;
  try {
    const findOrderId = await orderService.findOrderById(user, req.params.id);
    return res
      .status(200)
      .json({ message: "order id found  successfully ", findOrderId });
  } catch (error) {
    return res.status(500).json({ message: "not found orderId  " });
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
      .json({ message: "successfully show orderHistory ", orderHistory });
  } catch (error) {
    return res.status(500).json({ message: "not show orderHistory" });
  }
};

module.exports = { orderHistory, createOrder, findOrderById };
