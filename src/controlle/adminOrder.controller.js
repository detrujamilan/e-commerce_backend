const orderService = require("../services/product.services");

async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "not found all orders" });
  }
}

async function confirmedOrders(req, res) {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.confirmeOrders(orderId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "not confirmeOrders" });
  }
}

async function shipOrders(req, res) {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.shipOrders(orderId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "not confirmeOrders" });
  }
}

async function deliverOrders(req, res) {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deliveryOrders(orderId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "not deliveryOrders" });
  }
}

async function cancleOrders(req, res) {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.cancleOrders(orderId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "cancleOrders" });
  }
}

async function deleteOrders(req, res) {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deleteOrders(orderId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "cancleOrders" });
  }
}

module.exports = {
  getAllOrders,
  confirmedOrders,
  shipOrders,
  deliverOrders,
  cancleOrders,
  deleteOrders,
};
