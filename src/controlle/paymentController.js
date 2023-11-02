const paymentServices = require("../services/paymentService");
const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentServices.createPaymentLink(req.params.id);
    return res
      .status(200)
      .json({ message: "Payment link created", paymentLink });
  } catch (error) {
    return res.status(501).json({ message: "", error: error.message });
  }
};
const updatePaymentInformation = async (req, res) => {
  try {
    await paymentServices.updatePaymentInformation(req.query);
    return res
      .status(200)
      .json({ message: "Payment information updated", success: true });
  } catch (error) {
    return res.status(501).json({
      message: " Payment information updated error",
      error: error.message,
    });
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
