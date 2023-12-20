import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/home/Header/Header";
import DashBoard from "./seller-Dash/seller-dashboard/sellerDashBoard";
const UserDash = () => {
  return (
    <>
      <Header />
      <DashBoard />
      <Routes>
        <Route path="/seller/dash" element={<DashBoard />}></Route>
      </Routes>
    </>
  );
};

export default UserDash;
