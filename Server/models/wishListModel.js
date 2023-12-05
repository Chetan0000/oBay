const mongoose = require("mongoose");

const wishListSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
});

const WishList = mongoose.model("WishList", wishListSchema);
module.exports = WishList;
