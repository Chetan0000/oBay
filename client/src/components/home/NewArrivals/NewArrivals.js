import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
// import { addToCartSlice } from "../../../redux/slices/cart/cartSlice";
import { addItemsToCart } from "../../../actions/cartActions";
import { addItemsToWishList } from "../../../actions/wishListAction";
const NewArrivals = () => {
  const [products, setProducts, user] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/product/newArrivals");
      setProducts(data);
      console.log(data);
    } catch (error) {
      return;
    }
  };

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

  // ----------- Business logic functions -----------------
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.products);
  const wishItems = useSelector((state) => state.wishList.products);
  const addToCart = (product) => {
    dispatch(addItemsToCart(product, 1, user));
    // console.log(product);
    // console.log(items);
  };

  const addToWishList = (product) => {
    dispatch(addItemsToWishList(product, user));
    // console.log(wishItems);
  };

  return (
    <>
      <Box
        w={"95vw"}
        // display={"flex"}
        // flexDirection={"row"}
        // justifyContent={"center"}
        // alignItems={"center"}
        // gap={"15px"}
        borderTop={"1px solid #deded7"}
        overflow={"hidden"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Text
          fontSize={{ base: "25px", md: "30px", lg: "35px" }}
          fontWeight={"bold"}
          fontFamily={"DM Sans"}
          pt={"20px"}
          pb={"20px"}
          color={"black"}
        >
          New Arrivals
          {console.log(items)}
        </Text>
        <Box>
          <Slider {...settings}>
            {products.slice(0, 10).map((product) => {
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
                    price={product.price}
                    rating={product.ratings}
                    reviews={product.reviews}
                    addToCart={(e) => {
                      addToCart(product);
                    }}
                    addToWishList={(e) => {
                      addToWishList(product);
                    }}
                  />
                </Box>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default NewArrivals;
