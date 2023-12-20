const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const generateToken = require("../config/generateToken");

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
      products: seller.products,
      token: generateToken(seller._id),
    });
    console.log(seller);
  } else {
    return res.status(400).send("Invalid email or password");
  }
});

module.exports = { authSeller, registerSeller };
