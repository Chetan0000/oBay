import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartActions";

const ViewProductDetails = () => {
  const product = useSelector((state) => state.selectedProduct.selectedProduct);
  const user = useSelector((state) => state.user.user);
  const [ratingGiven, setRatingGiven] = useState();
  //   console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------------ popup functionality -----------
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ----------------Business Logics ------------------

  const addToCart = () => {
    dispatch(addItemsToCart(product, 1, user));
  };

  const buyNow = () => {
    dispatch(addItemsToCart(product, 1, user));
    navigate("/cart");
  };

  const addReviewFunction = () => {};

  return (
    <>
      <Box
        w={"95vw"}
        minH={"80vh"}
        border={"1px solid black"}
        m={"auto"}
        mt={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          w={"100%"}
          className="Back_button"
          display={"flex"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoIosArrowRoundBack size={"2rem"} />
        </Box>
        <Box
          className="Product_Card"
          //   border={"1px solid red"}
          w={"80%"}
          minH={"80vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card
            mt={"10px"}
            shadow={"lg"}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            // w={"94vw"}
          >
            <Box
              maxH={{ base: "300px", md: "400px", lg: "400px" }}
              //   border={"3px solid black"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", md: "400px", lg: "400px" }}
                maxH={{ base: "300px", md: "400px", lg: "400px" }}
                src={product.image}
                alt="Caffe Latte"
              />
            </Box>

            <Stack>
              <CardBody>
                <Heading size="md">{product.name}</Heading>

                <Box p={"10px"}>
                  <Text py="2">{product.description}</Text>
                </Box>
                <Box p={"10px"}>
                  <Text py="2">
                    <span className="font-medium">Category: </span>
                    {product.category}
                  </Text>
                </Box>
                <Box p={"10px"}>
                  <Text py="2">
                    <span className="font-medium">Stock: </span>
                    {product.stock}
                  </Text>
                </Box>
                <Box
                  p={"10px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                >
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={product.rating}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </div>
                  <div>
                    <span className="text-[#767676]">
                      {product.reviews.length}
                    </span>
                  </div>
                </Box>
              </CardBody>

              <CardFooter
                display={"flex"}
                flexDirection={{ base: "column", md: "row", lg: "row" }}
                gap={"20px"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} gap={"20px"}>
                  <Box
                    bg={"#262626"}
                    _hover={{
                      bg: "#000000",
                      transitionDuration: "0.3s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                    //   variant="solid"
                    color={"white"}
                    //   colorScheme="white"
                    h={"35px"}
                    w={"100px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    cursor={"pointer"}
                    onClick={buyNow}
                  >
                    <Text>Buy Now</Text>
                  </Box>
                  <Box
                    bg={"#767676"}
                    _hover={{
                      bg: "#262626",
                      transitionDuration: "0.3s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                    //   variant="solid"
                    color={"white"}
                    //   colorScheme="white"
                    h={"35px"}
                    w={"100px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    cursor={"pointer"}
                    onClick={addToCart}
                  >
                    <Text>Add to Cart</Text>
                  </Box>
                </Box>
                <Box
                  cursor={"pointer"}
                  _hover={{
                    color: "#3366CC",
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "ease-in-out",
                  }}
                  onClick={onOpen}
                >
                  <Text as={"u"}>Add review</Text>
                  {/* ------------ popup mode --------------- */}

                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered={"true"}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Add Review</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Text fontWeight={"semibold"}>Rate out of 5</Text>
                        <div>
                          <ReactStars
                            count={5}
                            size={40}
                            activeColor="#ffd700"
                            edit={"true"}
                            isHalf={"true"}
                            onChange={(newValue) => {
                              setRatingGiven(newValue);
                              console.log(
                                `Example 4: new value is ${newValue}`
                              );
                            }}
                          />
                        </div>

                        <Box>
                          <Textarea
                            placeholder="Review"
                            w={"350px"}
                            _focusVisible={{
                              outline: "gray",
                            }}
                          ></Textarea>
                        </Box>
                        {/* <Lorem count={2} /> */}
                      </ModalBody>

                      <ModalFooter
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Button
                          bg={"#262626"}
                          _hover={{
                            bg: "#000000",
                            transitionDuration: "0.3s",
                            transitionTimingFunction: "ease-in-out",
                          }}
                          color={"white"}
                          borderRadius={"0px"}
                          mr={3}
                          onClick={onClose}
                        >
                          Submit
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
        <Box h={"80vh"} w={"100%"} border={"2px solid green"}>
          Box
        </Box>
      </Box>
    </>
  );
};

export default ViewProductDetails;
