const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: "",
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
