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
} = require("../controller/userController");
const { userProtect } = require("../middleware/authMiddleware");
const {
  deleteFromWatchList,
  addWishList,
  viewWishList,
} = require("../controller/wishListController");
const { addReview } = require("../controller/reviewController");

router.route("/login").post(authUser);
router.route("/signUp").post(registerUser);

router.put("/addcart", userProtect, addTOCart);

// cart
router.get("/cart", userProtect, viewCart);
router.put("/updateCart", userProtect, updateCart);
router.put("/deletecart", userProtect, deleteCart);

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

module.exports = router;
