import axios from "axios";

import {
  addToCartSlice,
  increaseQuantitySlice,
  decreaseQuantitySlice,
  deleteItemSlice,
  clearCartSlice,
} from "../redux/slices/cart/cartSlice";
export const addItemsToCart =
  (product, quantity, user) => async (dispatch, getState) => {
    if (user != 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(config);
      await axios
        .post(
          "/user/addcart",
          {
            productId: product._id,
            count: quantity,
          },
          config
        )
        .then((response) => {
          // const data = [];
          // response.data.map((item) => dispatch(addToCartSlice(item)));
          dispatch(addToCartSlice(response.data[0]));
          console.log("Form userAction   ", response);
        })
        .catch((error) => {
          console.log(error.response.data);
          return;
        });
      // console.log("data form cartAction ", data);
      // dispatch(addToCartSlice(data));
    } else {
      const data = { _id: product._id, item: product, count: quantity };
      dispatch(addToCartSlice(data));
      // console.log("No seller  ", _id);
    }
    return;
  };

export const increaseQuantity =
  (product, quantity, user) => async (dispatch, getState) => {
    if (user != 0) {
      // ----- update in DB using API
      // first load all the cart items for this user as "data"
      // run through the "data" => (pro) and compar "product._id" with "pro.item" and take that "pro._id"
      // and update "pro._id"'s quantity
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.put(
          "/user/updateCart",
          {
            cartId: product._id,
            count: quantity,
          },
          config
        );
        // console.log(data);
        dispatch(increaseQuantitySlice(data));
      } catch (error) {
        console.log(error);
        return;
      }
      // dispatch(increaseQuantitySlice({ product }));
    } else {
      const data = { _id: product._id, item: product, count: quantity };
      dispatch(addToCartSlice(data));
      // console.log("No seller  ", _id);
    }
    // console.log("---- ", product);
  };

export const decreaseItem =
  (product, quantity, user) => async (dispatch, getState) => {
    if (quantity == 0) {
      return;
    }
    if (user != 0) {
      // ----- update in DB using API
      // first load all the cart items for this user as "data"
      // run through the "data" => (pro) and compar "product._id" with "pro.item" and take that "pro._id"
      // and update "pro._id"'s quantity
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.put(
          "/user/updateCart",
          {
            cartId: product._id,
            count: quantity,
          },
          config
        );
        // console.log(data);
        dispatch(decreaseQuantitySlice(data));
      } catch (error) {
        console.log(error.response.data);
        return;
      }
      // dispatch(increaseQuantitySlice({ product }));
    } else {
      const data = { _id: product._id, item: product, count: quantity };
      dispatch(addToCartSlice(data));
      // console.log("No seller  ", _id);
    }
  };

export const deleteItem = (product, user) => async (dispatch, getState) => {
  if (user != 0) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/user/deletecart",
        {
          cartId: product._id,
        },
        config
      );
      dispatch(deleteItemSlice(data));
    } catch (error) {
      console.log(error.response.data);
      return;
    }
  } else {
    const data = { _id: product._id };
    dispatch(deleteItemSlice(data));
    // console.log("No seller  ", _id);
  }
};

export const clearCart = (user) => async (dispatch, getState) => {
  if (user != 0) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/user/resetCart", config);
      dispatch(clearCartSlice());
      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
};
