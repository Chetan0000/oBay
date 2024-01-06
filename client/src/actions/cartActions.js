import axios from "axios";
import { UserState } from "../context/userContext";
import { addToCartSlice } from "../redux/slices/cart/cartSlice";
export const addItemsToCart =
  (_id, quantity, user) => async (dispatch, getState) => {
    if (user) {
      try {
        const config = {
          Headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put("/user/addcart", {
          productId: _id,
          count: quantity,
        });

        dispatch(addToCartSlice({ _id, quantity }));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addToCartSlice({ _id, quantity }));
      console.log("No seller  ", _id);
    }
    return;
  };
