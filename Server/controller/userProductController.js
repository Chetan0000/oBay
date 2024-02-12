const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const newArrivals = asyncHandler(async (req, res) => {
  try {
    const data = await Product.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const productRecommendations = asyncHandler(async (req, res) => {
  // const query = {
  //   $or: [
  //     { name: { $regex: req.body.query, $options: "i" } },
  //     { description: { $regex: req.body.query, $options: "i" } },
  //     // ... (sub-queries for additional keywords)
  //     { category: req.body.category },
  //   ],
  //   $or: { category: { $regex: req.body.category, $options: "i" } }, // Replace with your category value
  // };
  let word = "";
  word = req.body.query;

  const keywords = word.split(/\s+/);
  const query = {
    $or: keywords.map((keyword) => ({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: req.body.category },
      ],
    })),
    // category: req.body.category, // Filter by specified category
  };
  await Product.find(query)
    .limit(10)
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

const searchResults = asyncHandler(async (req, res) => {
  let searchKeyWord = "";
  searchKeyWord = req.query.searchKeyWord;

  //------------ handling pagination ---------------
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const keywords = searchKeyWord.split(/\s+/);
  const query = {
    $or: keywords.map((keyword) => ({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    })),
  };
  try {
    const data = await Product.find(query);

    // Slice the products array based on the indexes
    const paginatedProducts = data.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / pageSize);

    res.status(200).send({ products: paginatedProducts, totalPages });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  newArrivals,
  productRecommendations,
  searchResults,
};
