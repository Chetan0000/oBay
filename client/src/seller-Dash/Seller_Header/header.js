import React, { useState } from "react";
// import { logo } from "../../../assets/logo";
import { MdOutlineShoppingCart } from "react-icons/md";

import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
} from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosSearch } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";

const SellerHeader = () => {
  const location = useLocation();

  // --------- function to log out seller -------
  const logOutHandler = () => {
    localStorage.removeItem("sellerInfo");
  };
  return (
    <>
      <div className="w-screen h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200 text-black flex justify-between items-center lg:p-10 md:p-10 sm:justify-between sm:p-4 lg:justify-between md:justify-between ">
        <div
          id="logo"
          className="flex justify-center items-center sm:flex md:flex lg:flex"
        >
          <div className="text-3xl md:text-2xl sm:text-xl">
            <IconContext.Provider
              value={{
                color: "black",
                size: "1em",
                className: "global-class-name",
              }}
            >
              <MdOutlineShoppingCart />
            </IconContext.Provider>
          </div>
          <h3 className="font-medium sm:text-sm">OBAY</h3>
        </div>

        <Box
          display={{ base: "none", md: "flex", lg: "flex" }}
          gap={"10px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <motion.ui
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center w-auto z-50 p-0 gap-2"
          >
            <NavLink
              className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to={"/seller/dash"}
            >
              <p>Home</p>
            </NavLink>

            <NavLink
              className="flex font-normal hover:font-bold w-45 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to={"/seller/addProduct"}
            >
              <p>Add Product</p>
            </NavLink>
            <NavLink
              className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to={"/seller/profile"}
            >
              <p>Profile</p>
            </NavLink>
            <NavLink
              className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              onClick={logOutHandler}
              to={"/seller"}
            >
              <p>LogOut</p>
            </NavLink>
          </motion.ui>
        </Box>

        <Box display={{ base: "flex-end block", md: "none", lg: "none" }}>
          <Menu>
            <MenuButton>
              <HiMenuAlt2 />
            </MenuButton>
            <MenuList bg={"#262626"} color={"white"}>
              <MenuItem bg={"#262626"}>
                <Link to="/seller/dash">Home</Link>
              </MenuItem>

              <MenuDivider />

              <MenuItem bg={"#262626"}>
                <Link to="/seller/addProduct">Add Product</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem bg={"#262626"}>
                <Link to="/seller/profile">Profile</Link>
              </MenuItem>

              <MenuItem bg={"#262626"}>
                <Link onClick={logOutHandler}>LogOut</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </div>
    </>
  );
};

export default SellerHeader;
