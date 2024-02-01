import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext("");

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [seller, setSeller] = useState();
  const [selectedItem, setSelectedItem] = useState("");
  const [sellerSelectedProduct, setSellerSelectedProduct] = useState("");
  const location = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const sellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));

    setUser(userInfo);
    setSeller(sellerInfo);
    console.log(localStorage.getItem("sellerInfo"));
    if (userInfo) {
      // location("/");
    }

    if (sellerInfo) {
      location("seller/dash");
      location("seller/dash");
      // window.location.reload();
      // location("seller/dash");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        seller,
        searchResults,
        setSearchResults,
        sellerSelectedProduct,
        setSellerSelectedProduct,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
