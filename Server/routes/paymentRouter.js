const express = require("express");
const {
  checkout,
  paymentVerification,
  getKey,
} = require("../controller/paymentController");

const router = express.Router();

router.post("/checkout", checkout);
router.get("/getkey", getKey);
router.post("/paymentverification", paymentVerification);
module.exports = router;
