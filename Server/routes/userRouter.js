const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  addTOCart,
  updateCart,
  viewCart,
  deleteCart,
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

// review routes
router.post("/addreview", userProtect, addReview);

module.exports = router;
