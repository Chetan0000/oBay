const asyncHandler = require("express-async-handler");
const WishList = require("../models/wishListModel");

const viewWishList = asyncHandler(async (req, res) => {
  try {
    let data = await WishList.find({ user: req.user._id });

    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in Loading item from DB :- ${error.message}`);
  }
});

const addWishList = asyncHandler(async (req, res) => {
  const { productId, sellerId } = req.body;

  let obj = {
    user: req.user._id,
    item: productId,
    seller: sellerId,
  };
  const isExist = await WishList.find({ user: req.user._id, item: productId });
  console.log(isExist);
  if (isExist.length > 0) {
    res.status(200).json("Item Exist");
    return;
  }
  try {
    const data = await WishList.create(obj);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in adding item to watch List :- ${error.message}`);
  }
});

const deleteFromWatchList = asyncHandler(async (req, res) => {
  const { listId } = req.body;

  try {
    let data = await WishList.findByIdAndDelete(listId);
    data = { message: "Item deleted form wish List", ...data };
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(`Error in deleting item from WishList :- ${error.message}`);
  }
});
module.exports = { addWishList, deleteFromWatchList, viewWishList };
