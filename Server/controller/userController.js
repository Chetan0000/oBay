const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Cart = require("../models/cartModel");
const Address = require("../models/address");
const Product = require("../models/productModel");

// ------------- user SIgn up -----------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);
  if (!name || !password || !email) {
    console.log(name, email, password);
    return res.status(400).send(`Please fill all the fields`);
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
    return res.status(400).send(`Failed to create Seller try again later`);
  }
});

// ------------------User SIgn in function--------------------
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
    return res.status(400).send("Invalid email or password");
  }
});

// --------------------------Cart-----------------------------

// function to view cart items

const viewCart = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  try {
    let data = await Cart.find({ user: req.user._id })
      .populate("user", "name email")
      .populate("item")
      .populate("seller", "name email");

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
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
    res.status(400).send("Item Exist");
    return;
  }
  try {
    const data = await Cart.create({
      user: req.user._id,
      item: productId,
      count: count,
    });
    console.log(req.user._id);
    let newData = await Cart.find({ _id: data._id })
      .populate("user", "name email")
      .populate("item")
      .populate("seller", "name email");
    res.status(200).json(newData);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in adding item to cart :- ${error.message}`);
  }
});

// function to update cart items
const updateCart = asyncHandler(async (req, res) => {
  const { cartId, count } = req.body;
  const id = req.user._id;

  try {
    const data = await Cart.findByIdAndUpdate(
      { _id: cartId },
      { count: count },
      {
        new: true,
        upsert: true,
      }
    )
      .populate("user", "name email")
      .populate("item")
      .populate("seller", "name email");
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// Function to delete item from cart
const deleteCart = asyncHandler(async (req, res) => {
  const { cartId } = req.body;

  try {
    const data = await Cart.findByIdAndDelete(
      { _id: cartId },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in Deleting item from Cart :- ${error.message}`);
  }
});

// ---------- function to reset cart -----------

const resetCart = asyncHandler(async (req, res) => {
  try {
    const data = await Cart.deleteMany({ user: req.user._id });
    res.status(200).send("Cart has been reseated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Function to add Address

const addAddress = asyncHandler(async (req, res) => {
  const {
    name,
    mobileNumber,
    pinCode,
    address,
    cityDistrictTown,
    state,
    landmark,
    alternatePhone,
  } = req.body;
  try {
    const data = await Address.create({
      user: req.user._id,
      name,
      mobileNumber,
      pinCode,
      address,
      cityDistrictTown,
      state,
      landmark,
      alternatePhone,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// FUnction to update Address

const updateAddress = asyncHandler(async (req, res) => {
  const {
    iD,
    name,
    mobileNumber,
    pinCode,
    address,
    cityDistrictTown,
    state,
    landmark,
    alternatePhone,
  } = req.body;

  try {
    const data = await Address.findByIdAndUpdate(
      { _id: iD },
      {
        name,
        mobileNumber,
        pinCode,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// function to view Address
const viewAddress = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  try {
    const data = await Address.find({ user: req.user._id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// function to add review

const addReview = asyncHandler(async (req, res) => {
  const { productId, rating, avgRating, comment } = req.body;
  const newReview = {
    user: req.user._id,
    rating: rating,
    comment: comment,
  };
  await Product.findByIdAndUpdate(
    { _id: productId },
    { ratings: avgRating },
    {
      new: true,
      upsert: true,
    }
  ).then((product) => {
    product.reviews.push(newReview);
    product.save();
    res.status(200).send(product);
  });

  try {
    // const data = await Product.findByIdAndUpdate(
    //   { _id: productId },
    //   { ratings: avgRating },
    //   {
    //     new: true,
    //     upsert: true,
    //   }
    // );
    // console.log(data);
    // res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  authUser,
  registerUser,
  addTOCart,
  updateCart,
  viewCart,
  deleteCart,
  resetCart,
  addAddress,
  updateAddress,
  viewAddress,
  addReview,
};
