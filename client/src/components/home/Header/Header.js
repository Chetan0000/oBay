import React, { useState } from "react";
// import { logo } from "../../../assets/logo";
import { MdOutlineShoppingCart } from "react-icons/md";
import { UserState } from "../../../context/userContext";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  InputGroup,
  IconButton,
  InputRightElement,
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
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";

// redux----

import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../../actions/cartActions";
import { addItemsToWishList } from "../../../actions/wishListAction";
const Header = () => {
  const { user, searchResults, setSearchResults } = UserState();
  const location = useLocation();
  const [search, setSearch] = useState();
  // globule states
  const CartItems = useSelector((state) => state.cart.products);
  const wishItems = useSelector((state) => state.wishList.products);
  //----------- logics
  const searchHandel = (query) => {};

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
          <motion.ui
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center w-auto z-50 p-0 gap-2"
          >
            <h3 className="font-medium sm:text-sm">OBAY</h3>
          </motion.ui>
        </div>
        <div className="searchBar flex justify-center items-center lg:w-2/5 md:w-2/5 sm:w-2/3">
          <FormControl
            display={"flex"}
            flexDir={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <InputGroup>
              <Input
                placeholder="Search...!"
                type="text"
                border={"none"}
                bg={"#f5f5f3"}
                _focusVisible={{
                  outline: "none",
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <InputRightElement cursor={"pointer"} padding={"auto"}>
                <IoIosSearch
                  className="p-1 font-medium text-3xl"
                  onClick={searchHandel(search)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
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
              className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-8 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to={"/"}
            >
              <p>Home</p>
            </NavLink>
            <NavLink
              className="flex font-normal hover:font-bold w-[20px] h-6 justify-center items-center px-8 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to={"/wishList"}
            >
              <span className="wishList">
                <FaHeart size={"1.2rem"} />
              </span>
              <span className="mt-[-20px]">
                {wishItems.length > 0 ? <>{wishItems.length}</> : <></>}
              </span>
            </NavLink>

            <NavLink
              className="flex font-normal hover:font-bold w-[20px] h-6 justify-center items-center px-8 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to={"/cart"}
            >
              <span className="cart">
                <FaCartShopping size={"1.2rem"} />
              </span>
              <span className="mt-[-20px]">
                {CartItems.length > 0 ? <>{CartItems.length}</> : <></>}
              </span>
            </NavLink>
            <NavLink
              className="flex font-normal hover:font-bold w-[20px]] h-6 justify-center items-center px-8 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              state={{ data: location.pathname.split("/")[1] }}
            >
              <span className="profile">
                <RiAccountCircleFill size={"1.5rem"} />
              </span>
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
                <Link to="/">Home</Link>
              </MenuItem>

              <MenuDivider />

              <MenuItem bg={"#262626"}>
                <Link to="/cart">Cart</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem bg={"#262626"}>
                <Link to="/wishList">WishList</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem bg={"#262626"}>
                <Link to="/profile">Profile</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </div>
    </>
  );
};

export default Header;
