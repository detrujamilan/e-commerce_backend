const Razorpay = require("razorpay");

const razorPayClient = new Razorpay({
  key_id: "rzp_test_FSkJNHqIVvQGQo",
  key_secret: "j03uCi2fvGJVbxsHJ5cUapgB",
});

module.exports = { razorPayClient };
