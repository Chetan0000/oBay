const express = require("express");
const {
  newArrivals,
  searchResults,
} = require("../controller/userProductController");
const {
  productRecommendations,
} = require("../controller/userProductController");

const router = express.Router();

router.get("/newArrivals", newArrivals);

router.post("/recommendedProduct", productRecommendations);

router.get("/search", searchResults);
module.exports = router;
