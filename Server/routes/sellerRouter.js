const express = require("express");
const {
  authSeller,
  registerSeller,
  orders,
  updateOrder,
} = require("../controller/sellerController");
const {
  addProduct,
  editProduct,
  deleteProduct,
  viewProducts,
  viewProduct,
} = require("../controller/productController");
const { sellerProtect } = require("../middleware/authMiddleware");
const { allReviews } = require("../controller/reviewController");
const router = express.Router();

router.post("/login", authSeller);
router.post("/signup", registerSeller);

// product routes
router.get("/product/:productId", sellerProtect, viewProduct);
router.get("/products", sellerProtect, viewProducts);
router.post("/addproduct", sellerProtect, addProduct);
router.put("/productupdate", sellerProtect, editProduct);
router.get("/deleteProduct/:productId", sellerProtect, deleteProduct);

// Order Routers

router.get("/orders", sellerProtect, orders);
router.post("/order/update", sellerProtect, updateOrder);

// product reviews
router.get("/product/review", sellerProtect, allReviews);
module.exports = router;
