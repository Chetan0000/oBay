// import React from "react";
import React, { Component, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserState } from "../../../context/userContext";
const Banner = () => {
  const { selectedItem, setSelectedItem } = UserState();

  // --------react slick function --------------
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "93%",

          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <>
      <Box width={"95vw"} marginTop={"20px"} overflow={"hidden"}>
        <Slider {...settings}>
          <Box
            w={"100vw"}
            onClick={() => {
              setSelectedItem("1");
            }}
          >
            <Image
              w={"100vw"}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dzudljnu4/image/upload/v1703828765/bannerImgOne.cc70f00d1512cb1f97f6_he9nvn.webp"
            ></Image>
          </Box>
          <Box
            w={"100vw"}
            onClick={() => {
              setSelectedItem("2");
            }}
          >
            <Image
              w={"100vw"}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dzudljnu4/image/upload/v1704037999/cam_ptipox.png"
            ></Image>
          </Box>
          <Box
            w={"100vw"}
            onClick={() => {
              setSelectedItem("3");
            }}
          >
            <Image
              w={"100vw"}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dzudljnu4/image/upload/v1703828765/bannerImgOne.cc70f00d1512cb1f97f6_he9nvn.webp"
            ></Image>
          </Box>
          <Box
            w={"100vw"}
            onClick={() => {
              setSelectedItem("4");
            }}
          >
            <Image
              w={"100vw"}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dzudljnu4/image/upload/v1703828765/bannerImgOne.cc70f00d1512cb1f97f6_he9nvn.webp"
            ></Image>
          </Box>
        </Slider>
      </Box>
    </>
  );
};

export default Banner;
