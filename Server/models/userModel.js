const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone_no: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
    console.log("Check");
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter product Name"],
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: [true, "Please Enter product Description"],
//   },
//   price: {
//     type: Number,
//     required: [true, "Please Enter product Price"],
//     maxLength: [8, "Price cannot exceed 8 characters"],
//   },
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   category: {
//     type: String,
//     required: [true, "Please Enter Product Category"],
//   },
//   Stock: {
//     type: Number,
//     required: [true, "Please Enter product Stock"],
//     maxLength: [4, "Stock cannot exceed 4 characters"],
//     default: 1,
//   },
//   numOfReviews: {
//     type: Number,
//     default: 0,
//   },
//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//       },
//       comment: {
//         type: String,
//         required: true,
//       },
//     },
//   ],

//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Product", productSchema);
