const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_no: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
});

sellerSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});
sellerSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("matchPassword");
  return await bcrypt.compare(enteredPassword, this.password);
};

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
