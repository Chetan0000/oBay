import axios from "axios";
import { logUser, deleteUser } from "../redux/slices/userSlice/userSlice";
import { addToCartSlice, clearCartSlice } from "../redux/slices/cart/cartSlice";
import { persistor } from "../redux/store";
export const setUserData = (data) => async (dispatch, getState) => {
  if (data) {
    console.log("check user action ", data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(logUser({ data }));
    dispatch(clearCartSlice());
    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };
    await axios.get("/user/cart", config).then((response) => {
      const data = [];
      response.data.map((item) => dispatch(addToCartSlice(item)));
    });
  }
};

const fetchUserCartData = async (token) => {};

export const deleteUserData = (data) => async (dispatch, getState) => {
  if (data) {
    console.log("Check form userAction LogOut function", data);
    localStorage.clear();
    persistor.purge();
    dispatch(deleteUser({ data }));
    dispatch(clearCartSlice());
  } else {
    return;
  }
};

// -------- User Update function --------------

export const userUpdateAction = (data) => async (dispatch, getState) => {
  if (data) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      };
      const { user } = await axios.put("");
    } catch (error) {}
  }
};
