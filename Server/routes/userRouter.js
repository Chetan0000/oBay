const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  addTOCart,
  updateCart,
  viewCart,
  deleteCart,
  addAddress,
  updateAddress,
  viewAddress,
  resetCart,
  addReview,
  getOrders,
} = require("../controller/userController");
const { userProtect } = require("../middleware/authMiddleware");
const {
  deleteFromWatchList,
  addWishList,
  viewWishList,
} = require("../controller/wishListController");

router.route("/login").post(authUser);
router.route("/signUp").post(registerUser);

router.post("/addcart", userProtect, addTOCart);

// cart
router.get("/cart", userProtect, viewCart);
router.put("/updateCart", userProtect, updateCart);
router.put("/deletecart", userProtect, deleteCart);
router.get("/resetCart", userProtect, resetCart);

// wishList
router.get("/wishlist", userProtect, viewWishList);
router.post("/addwishlist", userProtect, addWishList);
router.put("/deletewatchlist", userProtect, deleteFromWatchList);

// Address
router.get("/address", userProtect, viewAddress);
router.post("/addAddress", userProtect, addAddress);
router.put("/updateAddress", userProtect, updateAddress);
// review routes
router.post("/addreview", userProtect, addReview);

// Order Routes
router.get("/orders", userProtect, getOrders);

module.exports = router;
