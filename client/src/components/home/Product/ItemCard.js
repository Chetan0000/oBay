import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import ReactStars from "react-rating-stars-component";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useMediaQuery } from "react-responsive";
import { addSelectedProduct } from "../../../redux/slices/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ItemCard = ({
  _id,
  image,
  name,
  description,
  category,
  price,
  stock,
  rating,
  reviews,
  addToCart,
  addToWishList,
}) => {
  //   -----------react responsive -----------
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 700px)" });
  var x = window.matchMedia("(max-width: 700px)");
  let startStyle = {
    count: 5,
    size: 18,
    value: rating,
    activeColor: "#ffd700",
    edit: false,
  };
  const style = () => {
    if (isTabletOrMobile) {
      startStyle = {
        count: 5,
        size: 5,
        value: rating,
        activeColor: "#ffd700",
        edit: false,
      };
      console.log("MM MM ");
    }
  };
  useMemo(() => style, [x, isTabletOrMobile]);

  const handelClick = () => {
    dispatch(
      addSelectedProduct({
        _id: _id,
        image: image,
        name: name,
        price: price,
        description: description,
        category: category,
        stock: stock,
        rating: rating,
        reviews: reviews,
      })
    );
    navigate("/view/product");
  };
  return (
    <Box
      w={{ base: "45vw", md: "25vw", lg: "20vw" }}
      h={{ base: "26vh", md: "35vh", lg: "35vh" }}
      maxW={{ base: "45vw", md: "30vw", lg: "20vw" }}
      maxH={{ base: "26vh", md: "35vh", lg: "35vh" }}
      border={"1px solid #ebe3e3"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={handelClick}
      cursor={"pointer"}
    >
      <Box
        maxW={"80%"}
        maxH={"75%"}
        // w={"80%"}
        h={"75%"}
        // border={"1px solid blue"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image maxW={"100%"} maxH={"100%"} src={image} objectFit={"cover"} />
      </Box>
      <Box
        w={{ base: "80%", md: "80%", lg: "100%" }}
        borderTop={"1px solid #ebe3e3"}
        textAlign={"center"}
      >
        <Text
          fontSize={{ base: "12px", md: "14px", lg: "16px" }}
          fontWeight={"semibold"}
        >
          {name.length > 25 ? <>{name.substring(0, 20)}..</> : <>{name}</>}
        </Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        maxW={"100%"}
        h={{ base: "25px", md: "30px", lg: "35px" }}
        padding={"5px"}
        // borderTop={"1px solid #ebe3e3"}
      >
        <div className=" gap-1 flex justify-center items-center">
          <ReactStars {...startStyle} />
          <Text color={"#767676"}>- {reviews.length}</Text>
        </div>
        <div
          className="lg:text-[24px] md:text-[24px] sm:text-[20px]"
          onClick={(e) => {
            addToCart();
            e.stopPropagation();
          }}
        >
          <LiaCartPlusSolid />
        </div>
      </Box>
    </Box>
  );
};

export default ItemCard;
