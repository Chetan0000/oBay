// import React from "react";
import React, { Component, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserState } from "../../../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedProduct } from "../../../redux/slices/Product/ProductSlice";
import axios from "axios";
// import { addSelectedProduct } from "../../../redux/slices/Product/ProductSlice";
const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelClick = async (id) => {
    try {
      // const { data } = await axios.get(`/product/searchById?ID=${product._id}`);
      const { data } = await axios.get(`/product/searchById?ID=${id}`);
      console.log("log in banner ", data);
      dispatch(
        addSelectedProduct({
          _id: data._id,
          image: data.images,
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
          stock: data.stock,
          rating: data.rating,
          reviews: data.reviews,
        })
      );
      navigate("/view/product");
    } catch (error) {
      console.log(error);
    }
  };

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
            // h={{ base: "30vh", md: "25vh", lg: "70vh" }}
            // border={"2px solid black"}
            onClick={() => {
              handelClick("65c8e624bd021ff3b668924a");
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
            // h={{ base: "30vh", md: "25vh", lg: "70vh" }}
            // border={"2px solid black"}
            onClick={() => {
              handelClick("65924a69fa86b5c190cea910");
            }}
          >
            <Image
              w={"100vw"}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dzudljnu4/image/upload/v1704037999/cam_ptipox.png"
            ></Image>
          </Box>
          {/* <Box
            w={"100vw"}
            // h={{ base: "30vh", md: "25vh", lg: "70vh" }}
            // border={"2px solid black"}
            onClick={() => {
              setSelectedItem("3");
            }}
          >
            <Image
              w={"100vw"}
              // h={{ base: "150px" }}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dzudljnu4/image/upload/v1703828765/bannerImgOne.cc70f00d1512cb1f97f6_he9nvn.webp"
            ></Image>
          </Box> */}

          <Box
            w={"100vw"}
            className="Fold"
            // h={{ base: "30vh", md: "25vh", lg: "70vh" }}
            // border={"2px solid black"}
            onClick={() => {
              handelClick("65924b3cfa86b5c190cea916");
            }}
          >
            <Image
              w={"100vw"}
              objectFit={"contain"}
              src="https://res.cloudinary.com/dlek1smmu/image/upload/v1707652145/z-flip_koauk5.png"
            ></Image>
          </Box>
        </Slider>
      </Box>
    </>
  );
};

export default Banner;
