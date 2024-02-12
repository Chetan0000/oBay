import React, { useEffect } from "react";
import Banner from "../../components/home/Banner/Banner";
import BannerBottom from "../../components/home/Banner/BannerBottom";
import { Box, Stat } from "@chakra-ui/react";
import { UserState } from "../../context/userContext";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Featured from "../../components/home/Featured/Featured";
import {
  RemoveScrollBar,
  noScrollbarsClassName,
} from "react-remove-scroll-bar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
<RemoveScrollBar />;

const Home = () => {
  const { selectedItem, setSelectedItem } = UserState();
  useEffect(() => {
    console.log(selectedItem);
    window.scrollTo(0, 0);
  }, [selectedItem]);
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.products);
  console.log("from home .js ", user);
  console.log("from home .js cart items ", cartItems);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        // border={"2px solid red"}
        overflow={"hidden"}
      >
        <Banner />
        <BannerBottom />
        <div id="NewArrivals_BOX" className="pt-[50px]">
          <NewArrivals />
        </div>

        <div id="Featured_BOX" className="pt-[50px]">
          <Featured />
        </div>

        {/* <Box h={"100px"}></Box> */}
      </Box>
    </>
  );
};

export default Home;
