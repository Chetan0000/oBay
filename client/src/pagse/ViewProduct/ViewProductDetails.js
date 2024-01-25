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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartActions";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { addSelectedProduct } from "../../redux/slices/Product/ProductSlice";
import { addReview } from "../../actions/productAction";
import Slider from "react-slick";
import { addItemsToWishList } from "../../actions/wishListAction";
import SampleNextArrow from "../../components/home/NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../../components/home/NewArrivals/SamplePrevArrow";
import Product from "../../components/home/NewArrivals/Product";

const ViewProductDetails = () => {
  window.scrollBy(0, -10000);
  const product = useSelector((state) => state.selectedProduct.selectedProduct);
  const user = useSelector((state) => state.user.user);
  const [ratingGiven, setRatingGiven] = useState();
  const [reviewGiven, setReviewGiven] = useState();
  const [recommenderProducts, setRecommenderProducts] = useState([]);
  const [slideShowLength, setSlideShowLength] = useState(4);

  //   console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------------ popup functionality -----------
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ----------------Business Logics ------------------

  const addToCartt = () => {
    dispatch(addItemsToCart(product, 1, user));
  };

  const buyNow = () => {
    dispatch(addItemsToCart(product, 1, user));
    navigate("/cart");
  };

  const addReviewFunction = async () => {
    if (ratingGiven == 0) {
      return;
    }
    let avgRating = product.rating * product.reviews.length;
    // console.log(avgRating);
    avgRating += ratingGiven;
    // console.log(avgRating);
    avgRating = avgRating / (product.reviews.length + 1);
    console.log(avgRating);
    dispatch(addReview(user, product._id, avgRating, ratingGiven, reviewGiven));
  };

  // ------------------------- Recommended Products -------------
  useEffect(() => {
    getRecommended();
  }, [product]);

  const getRecommended = async () => {
    try {
      const { data } = await axios.post("/product/recommendedProduct", {
        query: product.name,
        category: product.category,
      });
      let newData = [];
      newData = [...data];
      newData = newData.filter((item) => {
        return item._id != product._id;
      });
      console.log("WIth", newData);
      setRecommenderProducts(newData);
      console.log("Before", data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const addToCart = (item) => {
    dispatch(addItemsToCart(item, 1, user));
    // console.log(product);
    // console.log(items);
  };

  const addToWishList = (item) => {
    dispatch(addItemsToWishList(item, user));
    // console.log(wishItems);
  };

  // if (recommenderProducts.length < 3) {
  //   setSlideShowLength(recommenderProducts.length);
  // }
  // ----------------------- react slick ---------------
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
        // length: 3,
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
  return (
    <>
      <Box
        w={"95vw"}
        minH={"80vh"}
        // border={"1px solid black"}
        m={"auto"}
        mt={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={{ base: "20px", md: "0px", lg: "0px" }}
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
              maxH={{ base: "300px", md: "350px", lg: "400px" }}
              //   border={"3px solid black"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", md: "350px", lg: "400px" }}
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
                    onClick={addToCartt}
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
                              // console.log(
                              //   `Example 4: new value is ${newValue}`
                              // );
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
                            onChange={(e) => {
                              setReviewGiven(e.target.value);
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
                          onClick={() => {
                            onClose();
                            addReviewFunction();
                          }}
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
        <Box h={"70vh"} w={"100%"}>
          <Box>
            <Slider {...settings}>
              {recommenderProducts.map((product) => {
                return (
                  <Box
                    key={product._id}
                    onClick={() => {
                      // console.log(product._id);
                    }}
                    h={"70vh"}
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
      </Box>
    </>
  );
};

export default ViewProductDetails;
