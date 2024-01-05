const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, images, category, stock } = req.body;
  console.log(req.body);
  if (!name || !description || !price || !images || !category) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  }
  console.log(images);
  let newProduct = {
    name,
    description,
    price,
    images,
    category,
    stock,
    seller: req.seller._id,
  };
  console.log(newProduct);
  try {
    let product = await Product.create(newProduct);
    product = await product.populate("seller", "name email");
    const { data } = Seller.findById(req.seller._id);
    console.log(product);
    res.status(201).json({
      product,
    });
  } catch (error) {
    res.status(400);
    throw new Error(`Error in Creating product :${error.message}`);
  }
});

const editProduct = asyncHandler(async (req, res) => {
  const { productId, name, description, price, images, stock } = req.body;
  console.log(req.body);

  const data = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      description,
      price,

      stock,
    },
    {
      new: true,
    }
  );
  console.log(data);
  res.status(200).json(data);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const Id = req.params.productId;
  console.log(Id);

  try {
    const data = await Product.findByIdAndDelete(Id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in deleting Product from Data Base`);
  }
});

// --------- view all the products seller dash Board------------

const viewProducts = asyncHandler(async (req, res) => {
  try {
    let data = await Product.find({ seller: req.seller._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in fetching products :- ${error.message}`);
  }
});

// -------- view product details ------------------

const viewProduct = asyncHandler(async (req, res) => {
  const Id = req.params.productId;
  try {
    const data = await Product.find({ _id: Id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  viewProducts,
  viewProduct,
};
