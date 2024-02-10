const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
    },
    paymentID: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seller",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          default: "Ordered",
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "Refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["CoD", "Card", "Wire"],
      default: "Card",
    },
    orderStatus: {
      type: {
        type: String,
        // enum: ["Ordered", "Packed", "Shipped", "Delivered"],
        default: "Ordered",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
