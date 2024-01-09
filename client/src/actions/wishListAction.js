import axios from "axios";
import { addToWishListSlice } from "../redux/slices/wishList/wishListSlice";

export const addItemsToWishList =
  (product, user) => async (dispatch, getState) => {
    if (user) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/user/addwishlist",
          {
            productId: product._id,
          },
          config
        );
        dispatch(addToWishListSlice({ product }));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addToWishListSlice({ product }));
    }
  };
