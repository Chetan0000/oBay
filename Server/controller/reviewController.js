const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const addReview = asyncHandler(async (req, res) => {
  const { productId, sellerID, rating, comment } = req.body;

  try {
    const data = await Review.create({
      productId: productId,
      reviewer: req.user._id,
      seller: sellerID,
      rating: rating,
      comment: comment,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in Adding Review to DB :- ${error.message}`);
  }
});

const allReviews = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  try {
    let data = await Review.find({ productId })
      .populate("reviewer", "name email")
      .populate("seller", "name email");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(`Error in loading reviews from DB :- ${error.message}`);
  }
});
module.exports = { addReview, allReviews };
