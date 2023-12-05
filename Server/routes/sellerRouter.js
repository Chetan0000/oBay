const express = require("express");
const {
  authSeller,
  registerSeller,
} = require("../controller/sellerController");
const {
  addProduct,
  editProduct,
  deleteProduct,
  viewProducts,
} = require("../controller/productController");
const { sellerProtect } = require("../middleware/authMiddleware");
const { allReviews } = require("../controller/reviewController");
const router = express.Router();

router.post("/login", authSeller);
router.post("/signup", registerSeller);

// product routes
router.get("/products", sellerProtect, viewProducts);
router.post("/addproduct", sellerProtect, addProduct);
router.put("/productupdate", sellerProtect, editProduct);
router.get("/deleteProduct/:productId", sellerProtect, deleteProduct);

// product reviews
router.get("/product/review", sellerProtect, allReviews);
module.exports = router;
