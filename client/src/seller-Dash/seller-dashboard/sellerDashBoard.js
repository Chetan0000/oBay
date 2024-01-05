import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AllProducts from "./AllProducts";
const SellerDashBoard = () => {
  useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <>
      <Box
        className="sellerDashBoard"
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100vw"}
        h={"85vh"}
        marginTop={"20px"}
        marginX={"auto"}
        paddingX={"40px"}
        gap={"20px"}
      >
        {/* <Box border={"1px solid"} borderColor={"black"} h={"100%"} w={"0%"}>
          <Box>
            <SellerMenu />
          </Box>
        </Box> */}
        <AllProducts></AllProducts>
      </Box>
    </>
  );
};

export default SellerDashBoard;
