import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchResults } from "../../../redux/slices/searchSlice/searchSlice";
import { handleNextPage, handlePrevPage } from "../../../actions/searchAction";
import { Box, Text } from "@chakra-ui/react";
import Product from "../NewArrivals/Product";
import ItemCard from "./ItemCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../../../actions/cartActions";

const Products = () => {
  let products = useSelector((state) => state.search.searchResults);
  const query = useSelector((state) => state.search.searchKeyWord);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const arr = [];

  // const [products, setProducts] = useState([]);

  const fetchData = async (page) => {
    // if (query == 0) {
    //   return;
    // }
    console.log(currentPage);
    try {
      const { data } = await axios.get(
        `/product/search?searchKeyWord=${query}&page=${page}&pageSize=6`
      );
      const { products, totalPages } = data;
      // setProducts(products);
      setTotalPages(totalPages);
      console.log("search Data", data);
      dispatch(addSearchResults(products));
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    console.log(currentPage, "++++++");
  };
  // -----------------

  const addToWishList = () => {};
  const addToCart = (item) => {
    dispatch(addItemsToCart(item, 1, user));
  };

  for (let i = 1; i <= totalPages; i++) {
    arr.push(i);
  }
  // const handelPrev = () => {};
  // const handelNext = () => {
  //   dispatch(handleNextPage);
  // };
  return (
    <>
      {products.length > 0 ? (
        <>
          <div>
            {/* Display the products */}
            <Box
              w={"100%"}
              className="Back_button"
              display={"flex"}
              alignItems={"center"}
              cursor={"pointer"}
              onClick={() => {
                navigate(-1);
              }}
              paddingLeft={"10px"}
            >
              <IoIosArrowRoundBack size={"2rem"} />
            </Box>
            <Box
              display={"flex"}
              // alignItems={"center"}
              justifyContent={"center"}
              mt={"10px"}
              // border={"1px solid black"}
              minH={"75vh"}
            >
              <div className="grid sm:gap-2 md:gap-4 lg:gap-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 ">
                {products.map((product) => {
                  return (
                    <Box key={product._id}>
                      <ItemCard
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
              </div>
            </Box>

            {/* Pagination controls */}
            {/* #ebe3e3 */}
            <Box
              // borderTop={"1px solid black"}
              mt={"15px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"25px"}
            >
              <Box
                pl={"5px"}
                pr={"5px"}
                border={"1px solid #ebe3e3"}
                cursor={"pointer"}
                onClick={() => {
                  handlePrevPage();
                }}
                _hover={{
                  boxShadow: "lg",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Prev
              </Box>
              <Box
                pl={"5px"}
                pr={"5px"}
                border={"1px solid #ebe3e3"}
                cursor={"pointer"}
                onClick={() => {
                  handleNextPage();
                }}
                _hover={{
                  boxShadow: "lg",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Next
              </Box>
            </Box>
          </div>
        </>
      ) : (
        <>
          <Box
            w={"100vw"}
            h={"80vh"}
            display={"flex"}
            justifyContent={"center"}
            // alignItems={"center"}
          >
            <Text
              fontSize={{ base: "20px", md: "30px", lg: "35px" }}
              color={"gray"}
            >
              Item not found...!
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default Products;
