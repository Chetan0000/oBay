const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const asyncHandler = require("express-async-handler");

const userProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decode token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, TOken Failed...");
  }
});

const sellerProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decode token
      // console.log("//////", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("---", decoded);
      const seller = await Seller.findById(decoded.id).select("-password");
      if (!seller) {
        res.status(401);
        throw new Error("Not authorized, Token Failed");
      }
      req.seller = seller;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, TOken Failed...");
  }
});

module.exports = { userProtect, sellerProtect };
