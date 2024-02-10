const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const generateToken = require("../config/generateToken");
const Order = require("../models/orderModel");

const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).send(`Please fill all the fields`);
  }

  const sellerExist = await Seller.findOne({ email });

  if (sellerExist) {
    return res.status(400).send(`User Exist`);
  }

  const seller = await Seller.create({
    name,
    email,
    phone_no: phone,
    password,
  });

  if (seller) {
    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone_no,
      token: generateToken(seller._id),
    });
  } else {
    return res.status(400).send(`Failed to create Seller try again later`);
  }
});

// function for seller auth<Login>
const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).send(`Please fill all the fields`);
  }

  const seller = await Seller.findOne({ email });
  // console.log(seller);
  if (seller && (await seller.matchPassword(password))) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone_no,
      token: generateToken(seller._id),
    });
    console.log(seller);
  } else {
    return res.status(400).send("Invalid email or password");
  }
});

const orders = asyncHandler(async (req, res) => {
  const id = req.seller._id;
  console.log(id);
  try {
    var orders = await Order.find({
      items: {
        $elemMatch: {
          seller: id, // Convert string to ObjectID
        },
      },
    })
      .populate("user addressId items.productId items.seller")
      .then((order) => {
        res.status(200).send(order);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { option, orderId, productId } = req.body;
  // Find the matching order
  console.log(req.seller);
  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
        "items.productId": productId,
      },
      { $set: { "items.$.status": option } },
      { new: true }
    );

    res.status(200).send(order);
  } catch (error) {
    console.error("Error updating item status:", error);
    res
      .status(400)
      .send({ message: "Error in updating please try later ... " });
  }
});

module.exports = { authSeller, registerSeller, orders, updateOrder };
