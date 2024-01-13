import axios from "axios";
import { logUser, deleteUser } from "../redux/slices/userSlice/userSlice";
export const setUserData = (data) => async (dispatch, getState) => {
  if (data) {
    console.log("check user action ", data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(logUser({ data }));
  }
};

export const deleteUserData = (data) => async (dispatch, getState) => {
  if (data) {
    console.log("Check form userAction LogOut function", data);
    localStorage.removeItem("userInfo");
    dispatch(deleteUser({ data }));
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
