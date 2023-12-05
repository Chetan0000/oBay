const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const generateToken = require("../config/generateToken");

const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error(`Please fill all the fields`);
  }

  const sellerExist = await Seller.findOne({ email });

  if (sellerExist) {
    res.status(400);
    throw new Error(`User Exist`);
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
    res.status(400);
    throw new Error(`Failed to create Seller try again later`);
  }
});

// function for seller auth<Login>
const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error(`Please fill all the fields`);
  }

  const seller = await Seller.findOne({ email });
  console.log(seller);
  if (seller && (await seller.matchPassword(password))) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      products: seller.products,
      token: generateToken(seller._id),
    });
    console.log(seller);
  } else {
    res.status(400);
    throw new Error(`Invalid email or password`);
  }
});

module.exports = { authSeller, registerSeller };
