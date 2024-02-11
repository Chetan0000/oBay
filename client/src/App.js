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
import UserPage from "./pagse/userPage/UserPage";
import WIshListPage from "./pagse/WIshLIst/WIshListPage";
import UserProfile from "./pagse/Profile/UserProfile";
import Orders from "./pagse/Orders/Orders";
import Footer from "./components/home/Footer/Footer";
// ------seller components -----------

import SellerPage from "./pagse/SellerPage/sellerPage";
import SellerHeader from "./seller-Dash/Seller_Header/header";
import SellerDashBoard from "./seller-Dash/seller-dashboard/sellerDashBoard";

import AddProduct from "./seller-Dash/seller-dashboard/AddProduct";
import Profile from "./seller-Dash/seller-dashboard/Profile";
import EditUser from "./components/UserProfile/EditUser";
import UserAddress from "./components/UserProfile/UserAddress";
import ViewProductDetails from "./pagse/ViewProduct/ViewProductDetails";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
// ------Contact Me page -----------
import ContactMe from "./pagse/ContactMe/ContactMe";
import Products from "./components/home/Product/Products";
import SellerOrders from "./seller-Dash/seller-dashboard/SellerOrders";
import { useDispatch, useSelector } from "react-redux";
import ViewProduct from "./seller-Dash/seller-dashboard/ViewProduct";

const App = () => {
  const [isLogin, setLsLogin] = useState(false);
  const user = useSelector((state) => state.user.user);
  const seller = useSelector((state) => state.seller.seller);
  // console.log("------------ ", seller);
  if (seller) {
  }
  return (
    <>
      <div className="flex flex-col">
        {/* {seller && window.location.pathname !== "/seller" ? (
          <SellerHeader />
        ) : (
          <>
            {user || window.location.pathname !== "/user" ? <Header /> : null}
          </>
        )} */}
        {window.location.pathname === "/seller" ||
        window.location.pathname === "/user" ||
        window.location.pathname === "/contactMe" ? null : ( // window.location.pathname === "/payment/success"
          <>{(seller != 0 && <SellerHeader />) || <Header />}</>
        )}
        <Routes>
          <Route path="/seller" element={<SellerPage />}></Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/user" element={<UserPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          {/* <Route path="/wishList" element={<WIshListPage />}></Route> */}
          <Route path="/user/profile" element={<UserProfile />}></Route>
          <Route path="/user/profile/editUser" element={<EditUser />}></Route>
          <Route path="/user/profile/address" element={<UserAddress />}></Route>
          {/* ----------------- Product Routes ----------------- */}

          <Route path="/view/product" element={<ViewProductDetails />}></Route>
          <Route path="/products/search/:search" element={<Products />}></Route>
          {/*-------------------- Contact Me Router ----------------  */}
          <Route path="/contactMe" element={<ContactMe />}></Route>
          {/* --------------------------------------------------------- */}

          {/* ----------- Payment Routes -----------------  */}
          <Route path="/payment/success" element={<PaymentSuccess />}></Route>

          {/* ---------------------- seller Routes ------------------------ */}

          <Route path="/seller/dash" element={<SellerDashBoard />}></Route>
          <Route path="/seller/products/view" element={<ViewProduct />}></Route>
          <Route path="/seller/addProduct" element={<AddProduct />}></Route>
          <Route path="/seller/profile" element={<Profile />}></Route>
          <Route path="/seller/orders" element={<SellerOrders />}></Route>
          {/* <Route path="/seller/view" element={<ViewProduct />}></Route> */}
        </Routes>
        {window.location.pathname === "/seller" ||
        window.location.pathname === "/user" ||
        window.location.pathname === "/contactMe" ? null : ( // window.location.pathname === "/payment/success"
          <Footer />
        )}
      </div>
    </>
  );
};

export default App;
