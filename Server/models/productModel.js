const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: 8,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      maxLength: 4,
      default: 1,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
