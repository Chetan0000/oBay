const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  count: {
    type: Number,
    default: 1,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
