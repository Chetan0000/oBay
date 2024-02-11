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
import React, { Children } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedProduct } from "../../../redux/slices/Product/ProductSlice";
const Product = ({
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      cursor={"pointer"}
      onClick={handelClick}
      // border={"1px solid black"}
      minH={"200px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        maxW="sm"
        w={{ base: "300px", md: "350px", lg: "350px" }}
        h={{ base: "450px", md: "500px", lg: "500px" }}
        shadow={"lg"}
        // border={"1px solid red"}
      >
        <CardBody
          maxH={{ base: "400px", md: "450px", lg: "500px" }}
          h={{ base: "400px", md: "450px", lg: "600px" }}
        >
          <Image
            w={"100%"}
            h={{ base: "250px", md: "300px", lg: "300px" }}
            src={image}
            // alt="Green double couch with wooden legs"
            borderRadius="lg"
            objectFit={"cover"}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            mt="6"
            spacing="3"
          >
            <Heading size="sm">{name}</Heading>
            {/* <Text>
                          This sofa is perfect for modern tropical spaces,
                          baroque inspired spaces, earthy toned spaces and for
                          people who love a chic design with a sprinkle of
                          vintage design.
                        </Text> */}
            <Text fontSize="xl">₹{price}</Text>
          </Box>
          <div className="flex justify-between items-center">
            <div>
              <ReactStars
                count={5}
                size={24}
                value={rating}
                activeColor="#ffd700"
                edit={false}
              />
            </div>

            <div>reviews: {reviews.length}</div>
          </div>
        </CardBody>
        <Divider color=" #deded7" />
        <CardFooter
          borderTop={"1px solid  white"}
          borderRight={"1px solid  #deded7"}
          borderLeft={"1px solid  #deded7"}
          borderBottom={"1px solid  #deded7"}
          h={"50px"}
          display={"flex"}
          // justifyContent={"center"}
          alignItems={"center"}
        >
          <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Button
              bg={"#2A2A2A"}
              color={"white"}
              _hover={{
                bg: "#191919",
              }}
            >
              Buy
            </Button>
            <Box>
              <Button
                variant="ghost"
                colorScheme="black"
                onClick={(e) => {
                  addToWishList();
                  e.stopPropagation();
                }}
                // color={"black"}
                // fontSize={"20px"}
                // _hover={{
                //   color: "#191919",
                // }}
              >
                <FaHeart />
              </Button>
              <Button
                variant="ghost"
                fontSize={"20px"}
                colorScheme="black"
                // _hover={{
                //   color: "#191919",
                // }}
                onClick={(e) => {
                  addToCart();
                  e.stopPropagation();
                }}
              >
                <FaCartPlus />
              </Button>
            </Box>
          </Box>
          {/* <ButtonGroup spacing="2"></ButtonGroup> */}
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Product;
