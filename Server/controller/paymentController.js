const asyncHandler = require("express-async-handler");

const dotenv = require("dotenv");

// ----------- Strip Set up -----------------
const stripe = require("stripe")(
  "sk_test_51OcsteSHGWMLpJ7dIMyhMg1AtJKeb6XxxMyIhiQdzuEOeSEl1naZbQxjhqdnAFq173j8pjvUVzGulmt3yPz4k4cm00CjjsJJk9"
);
const uuid = require("uuid");

const checkout = asyncHandler(async (req, res) => {
  const { token, products, amount } = req.body;
  const idempotencyKey = uuid();

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.item.name,
        images: [product.item.image],
      },
      unit_amount: product.item.price * 100,
    },
    quantity: product.count,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/sucess",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
});

const Razorpay = require("razorpay");

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// const checkout = asyncHandler(async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const options = {
//       amount: Number(req.body.amount * 100),
//       currency: "INR",
//       receipt: "order_recept_11",
//     };
//     const order = await instance.orders.create(options);
//     console.log(order);
//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
  }
});

const getKey = asyncHandler(async (req, res) => {
  res.status(200).send(process.env.RAZORPAY_API_KEY);
});

module.exports = {
  checkout,
  getKey,
  paymentVerification,
};
