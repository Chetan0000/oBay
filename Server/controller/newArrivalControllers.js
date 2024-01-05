const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const newArrivals = asyncHandler(async (req, res) => {
  try {
    const data = await Product.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  newArrivals,
};
