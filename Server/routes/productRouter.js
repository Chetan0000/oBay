const express = require("express");
const { newArrivals } = require("../controller/newArrivalControllers");

const router = express.Router();

router.get("/newArrivals", newArrivals);

module.exports = router;
