const express = require("express");
const {
  newArrivals,
  searchResults,
} = require("../controller/userProductController");
const {
  productRecommendations,
} = require("../controller/userProductController");
const { searchByID } = require("../controller/userController");
const { getFeatured } = require("../controller/productController");

const router = express.Router();

router.get("/newArrivals", newArrivals);

router.post("/recommendedProduct", productRecommendations);

router.get("/search", searchResults);

router.get("/searchById", searchByID);

router.get("/featured", getFeatured);

module.exports = router;
