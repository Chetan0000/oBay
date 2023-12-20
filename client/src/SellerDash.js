import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./seller-Dash/Seller_Header/header";
import SellerDashBoard from "./seller-Dash/seller-dashboard/sellerDashBoard";
const SellerDash = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<SellerDashBoard />}></Route>
      </Routes>
    </>
  );
};

export default SellerDash;
