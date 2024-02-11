import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Product from "../NewArrivals/Product";
import axios from "axios";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import { addItemsToCart } from "../../../actions/cartActions";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // react slick config
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------- function to fetch featured data
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/product/featured");
      setProducts(data);
    } catch (error) {
      console.log("Error in featured fetchData ", error);
      return;
    }
  };

  //
  const addToCart = (product) => {
    dispatch(addItemsToCart(product, 1, user));
    // console.log(product);
    // console.log(items);
  };
  return (
    <>
      <Box w={"95vw"} color={"#000000"}>
        <Box className="Title">
          <Text
            fontSize={{ base: "25px", md: "30px", lg: "35px" }}
            fontWeight={"bold"}
            fontFamily={"DM Sans"}
            pt={"20px"}
            pb={"20px"}
          >
            Featured
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={{ base: "10px", md: "0px", lg: "0px" }}
          //   border={"1px solid black"}
        >
          {/* <Slider {...settings}> */}
          {products.slice(0, 4).map((product) => {
            return (
              <Box
                key={product._id}
                onClick={() => {
                  // console.log(product._id);
                }}
              >
                <Product
                  _id={product._id}
                  image={product.images}
                  name={product.name}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  stock={product.stock}
                  rating={product.ratings}
                  reviews={product.reviews}
                  seller={product.seller}
                  addToCart={(e) => {
                    addToCart(product);
                  }}
                  addToWishList={(e) => {}}
                />
              </Box>
            );
          })}
          {/* </Slider> */}
        </Box>
      </Box>
    </>
  );
};

export default Featured;
