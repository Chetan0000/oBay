const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Cart = require("../models/cartModel");

// ------------- user SIgn up -----------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);
  if (!name || !password || !email) {
    console.log(name, email, password);
    res.status(400);
    throw new Error(`Please Enter all the Felids`);
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error(`User Exist`);
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(`Failed to create User Try again later...${error.message}`);
  }
});

// ------------------User SIgn UP function--------------------
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log(user);
  } else {
    console.log("Error");
    res.status(400);
    throw new Error(`Invalid Email or Password`);
  }
});

// --------------------------Cart-----------------------------

// function to view cart items

const viewCart = asyncHandler(async (req, res) => {
  try {
    let data = await Cart.find({ user: req.user._id })
      .populate("user", "name email")
      .populate("item")
      .populate("seller", "name email");

    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in fetching cart items :- ${error.message}`);
  }
});

// function to add product to cart
const addTOCart = asyncHandler(async (req, res) => {
  let { productId, count, sellerId } = req.body;
  let obj = {
    user: req.user._id,
    item: productId,
    count: count,
    seller: sellerId,
  };
  const isExist = await Cart.find({ user: req.user._id, item: productId });
  console.log(isExist);
  if (isExist.length > 0) {
    res.status(200).json("Item Exist");
    return;
  }
  try {
    const data = await Cart.create(obj);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in adding item to cart :- ${error.message}`);
  }
});

// function to update cart items
const updateCart = asyncHandler(async (req, res) => {
  const { cartId, count } = req.body;
  const id = req.user._id;
});

// Function to delete item from cart
const deleteCart = asyncHandler(async (req, res) => {
  const { cartId } = req.body;

  try {
    const data = await Cart.findByIdAndDelete(cartId);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in Deleting item from Cart :- ${error.message}`);
  }
});

module.exports = {
  authUser,
  registerUser,
  addTOCart,
  updateCart,
  viewCart,
  deleteCart,
};
