import axios from "axios";

import {
  addToCartSlice,
  increaseQuantitySlice,
  decreaseQuantitySlice,
  deleteItemSlice,
} from "../redux/slices/cart/cartSlice";
export const addItemsToCart =
  (product, quantity, user) => async (dispatch, getState) => {
    if (user) {
      try {
        const config = {
          Headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          "/user/addcart",
          {
            productId: product._id,
            count: quantity,
          },
          config
        );

        dispatch(addToCartSlice({ product, quantity }));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addToCartSlice({ product, quantity }));
      // console.log("No seller  ", _id);
    }
    return;
  };

export const increaseQuantity =
  (product, quantity, user) => async (dispatch, getState) => {
    if (user) {
      // ----- update in DB using API
      // first load all the cart items for this user as "data"
      // run through the "data" => (pro) and compar "product._id" with "pro.item" and take that "pro._id" 
      // and update "pro._id"'s quantity 
    } else {
      dispatch(increaseQuantitySlice({ product }));
    }
    console.log("---- ", product);
  };

export const decreaseItem =
  (product, quantity, user) => async (dispatch, getState) => {
    if (quantity == 1) {
      return;
    }
    if (user) {
      // ----- API call -------
      // first load all the cart items for this user as "data"
      // run through the "data" => (pro) and compar "product._id" with "pro.item" and take that "pro._id" 
      // and then decrease the quantity of the item "pro._id"
    } else {
      dispatch(decreaseQuantitySlice({ product, quantity }));
    }
  };
