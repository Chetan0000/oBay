import React, { useState } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Router,
  Switch,
} from "react-router-dom";

import { UserState } from "./context/userContext";
// import {} from "react";

import Header from "./components/home/Header/Header";
import Home from "./pagse/Home/home";
import Cart from "./pagse/Cart/Cart";

// ------seller components -----------

import SellerPage from "./pagse/SellerPage/sellerPage";
import SellerHeader from "./seller-Dash/Seller_Header/header";
import SellerDashBoard from "./seller-Dash/seller-dashboard/sellerDashBoard";
import UserDash from "./UserDash";
import SellerDash from "./SellerDash";
import AddProduct from "./seller-Dash/seller-dashboard/AddProduct";
import Profile from "./seller-Dash/seller-dashboard/Profile";
import ViewProduct from "./seller-Dash/seller-dashboard/ViewProduct";

const App = () => {
  const [isLogin, setLsLogin] = useState(false);
  const { user, seller } = UserState();
  // console.log("------------ ", seller);
  if (seller) {
  }
  return (
    <>
      <div>
        {/* {seller && window.location.pathname !== "/seller" ? (
          <SellerHeader />
        ) : (
          <>
            {user || window.location.pathname !== "/user" ? <Header /> : null}
          </>
        )} */}
        {window.location.pathname === "/seller" ||
        window.location.pathname === "/user" ? null : (
          <>{(seller && <SellerHeader />) || <Header />}</>
        )}
        <Routes>
          <Route path="/seller" element={<SellerPage />}></Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>

          {/* ---------------------- seller Routes ------------------------ */}

          <Route path="/seller/dash" element={<SellerDashBoard />}></Route>
          <Route path="/seller/addProduct" element={<AddProduct />}></Route>
          <Route path="/seller/profile" element={<Profile />}></Route>
          {/* <Route path="/seller/view" element={<ViewProduct />}></Route> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
