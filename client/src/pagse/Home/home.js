import React, { useEffect } from "react";
import Banner from "../../components/home/Banner/Banner";
import { Box } from "@chakra-ui/react";
import { UserState } from "../../context/userContext";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import {
  RemoveScrollBar,
  noScrollbarsClassName,
} from "react-remove-scroll-bar";
<RemoveScrollBar />;

const Home = () => {
  const { selectedItem, setSelectedItem } = UserState();
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

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

        <div className="pt-[50px]">
          <NewArrivals />
        </div>

        <Box h={"200px"}></Box>
      </Box>
    </>
  );
};

export default Home;
