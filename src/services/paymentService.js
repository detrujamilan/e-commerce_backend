const razorPay = require("../config/razorPayClient");
const orderServices = require("../services/order.services");

const createPaymentLink = async (res, orderId) => {
  try {
    const order = await orderServices.findOrderById(orderId);
    const paymentLinkRequest = {
      amount: order.totalPrice * 100,
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,
        contact: order.user.mobile,
        email: order.user.email,
      },

      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callBackUrl: `http://localhost:3000/payment/${orderId}`,
      callBackMethod: "get",
    };
    const paymentLink = await razorPay.razorPayClient.create(
      paymentLinkRequest
    );
    const paymentLinkId = await paymentLink.id;
    const payment_link_url = paymentLink.short_url;
    const resData = {
      paymentLinkId,
      payment_link_url,
    };
    return res
      .status(200)
      .json({ message: "Payment link created", data: resData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating payment link", error });
  }
};

const updatePaymentInformation = async (req) => {
  const paymentId = req.payment_id;
  const orderId = req.order_id;

  try {
    const order = await orderServices.findOrderById(orderId);

    const payment = await razorPay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";
      await order.save();
    }

    return res.status(201).json({ message: "order is placed", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Error placing order", error });
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
