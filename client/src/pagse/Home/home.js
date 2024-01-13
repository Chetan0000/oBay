import React, { useEffect } from "react";
import Banner from "../../components/home/Banner/Banner";
import BannerBottom from "../../components/home/Banner/BannerBottom";
import { Box, Stat } from "@chakra-ui/react";
import { UserState } from "../../context/userContext";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import {
  RemoveScrollBar,
  noScrollbarsClassName,
} from "react-remove-scroll-bar";
import { useDispatch, useSelector } from "react-redux";
<RemoveScrollBar />;

const Home = () => {
  const { selectedItem, setSelectedItem } = UserState();
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
  const user = useSelector((state) => state.user.user);
  console.log("from home .js ", user);
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        border={"2px solid red"}
        overflow={"hidden"}
      >
        <Banner />
        <BannerBottom />
        <div className="pt-[50px]">
          <NewArrivals />
        </div>

        <Box h={"200px"}></Box>
      </Box>
    </>
  );
};

export default Home;
