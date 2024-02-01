const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Order = require("../models/orderModel");
const Address = require("../models/address");

// ----------- Strip Set up -----------------
const stripe = require("stripe")(
  "sk_test_51OcsteSHGWMLpJ7dIMyhMg1AtJKeb6XxxMyIhiQdzuEOeSEl1naZbQxjhqdnAFq173j8pjvUVzGulmt3yPz4k4cm00CjjsJJk9"
);
const uuid = require("uuid");

// const checkout = asyncHandler(async (req, res) => {
//   const { token, products, amount } = req.body;
//   const idempotencyKey = uuid();

//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: product.item.name,
//         images: [product.item.image],
//       },
//       unit_amount: product.item.price * 100,
//     },
//     quantity: product.count,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3000/sucess",
//     cancel_url: "http://localhost:3000/cancel",
//   });
//   res.json({ id: session.id });
// });

const Razorpay = require("razorpay");
const Product = require("../models/productModel");

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
var amount = 0;
var items = [];
var user;
const checkout = asyncHandler(async (req, res) => {
  amount = req.body.amount;
  items = req.body.items;
  user = req.body.user;
  console.log("Items ", items);
  // console.log(user, amount, items);

  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      receipt: "order_recept_11",
      notes: {
        orderType: "Pre",
      },
    };
    const order = await instance.orders.create(options);
    // 0.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // -----calling function to add items to orders database ------
    createOrders(razorpay_payment_id, razorpay_order_id);
    reduceStock();
    // await Payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });

    res.redirect(
      `http://localhost:3000/payment/success?reference=${razorpay_order_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

const getKey = asyncHandler(async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

// --------------- FUnction to create Order IN data Base ---------
const createOrders = asyncHandler(async (paymentID, orderID) => {
  var address = {};
  address = await Address.find({ user: user._id });
  // console.log("Address", address);
  const itemData = [];
  console.log(items);
  items.map((item) => {
    itemData.push({
      productId: item.item._id,
      payablePrice: item.item.price,
      purchasedQty: item.count,
    });
  });

  try {
    let d = new Date();
    let dd = d.toDateString();
    const data = await Order.create({
      orderID: orderID,
      paymentID,
      user: user._id,
      addressId: address[0]._id,
      totalAmount: amount,
      items: itemData,
      paymentStatus: "Completed",
      orderStatus: {
        type: "Ordered",
        date: new Date(),
        isCompleted: false,
      },
    });
    // console.log("Address Data", data);
  } catch (error) {
    console.log("Address Error", error);
  }

  return;
});

// ------------- function to reduce stock of produce once order is placed --------

const reduceStock = asyncHandler(async () => {
  items.map(async (item) => {
    try {
      const qun = await Product.findByIdAndUpdate(
        { _id: item.item._id },
        { stock: item.item.stock - item.count },
        {
          new: true,
          upsert: true,
        }
      );
      // console.log("Updated Product ", qun);
    } catch (error) {
      console.log(error);
      return;
    }
  });
  return;
});

module.exports = {
  checkout,
  getKey,
  paymentVerification,
};
