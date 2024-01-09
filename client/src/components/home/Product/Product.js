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
const Product = ({
  _id,
  image,
  name,
  price,
  rating,
  reviews,
  addToCart,
  addToWishList,
}) => {
  return (
    <Box>
      <Card maxW="sm">
        <CardBody maxH={{ base: "400px", md: "450px", lg: "500px" }}>
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
                onClick={addToWishList}
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
                onClick={addToCart}
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
