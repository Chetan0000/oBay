import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaArrowRotateLeft } from "react-icons/fa6";
const BannerBottom = () => {
  return (
    <>
      <Box
        cursor={"pointer"}
        marginTop={"40px"}
        w={{ base: "95vw", md: "95vw", lg: "95vw" }}
        // border={"1px solid black"}
        display={{ base: "flex", md: "flex", lg: "flex" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ base: "row", md: "row", lg: "row" }}
      >
        <Box
          // border={"1px solid black"}
          w={"200px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"start"}
          _hover={{
            boxShadow: "lg",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <Text>
            {" "}
            <span className="lg:text-[20px] sm:text-[18px] font-semibold">
              2{" "}
            </span>
            Years Warranty
          </Text>
        </Box>
        <Box
          // border={"1px solid black"}
          w={"200px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
          fadeDuration={4}
          _hover={{
            boxShadow: "lg",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <span className="font-bold lg:text-[25px] sm:text-[22px]">
            <LiaShippingFastSolid />
          </span>
          <Text> Free Shipping</Text>
        </Box>
        <Box
          // border={"1px solid black"}
          w={"200px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"row"}
          gap={"10px"}
          _hover={{
            boxShadow: "lg",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <span className="lg:text-[20px] sm:text-[18px]  font-bold">
            {" "}
            <FaArrowRotateLeft />
          </span>
          <Text>Return policy in 30 days</Text>
        </Box>
      </Box>
    </>
  );
};

export default BannerBottom;
