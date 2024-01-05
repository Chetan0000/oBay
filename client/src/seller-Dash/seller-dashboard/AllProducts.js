import {
  Box,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  border,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import ProductForm from "../Seller_Components/ProductForm";
import { useState } from "react";
import { UserState } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ViewProduct from "./ViewProduct";
const AllProducts = () => {
  const location = useNavigate();
  const [products, setProducts] = useState([]);
  const { seller, sellerSelectedProduct, setSellerSelectedProduct } =
    UserState();

  // ----------------function to fetch all products---------------
  useEffect(() => {
    fetchAll();
  }, [seller, sellerSelectedProduct]);

  const fetchAll = async () => {
    if (!seller) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${seller.token}`,
        },
      };

      const { data } = await axios.get(`/seller/products`, config);

      setProducts(data);
    } catch (error) {}
  };

  // ------------------ function to redirect to view single product --------------------
  const viewProduct = async () => {
    console.log(sellerSelectedProduct);
  };
  return (
    <>
      {sellerSelectedProduct ? (
        <ViewProduct></ViewProduct>
      ) : (
        <Box
          className="bar"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"95%"}
          w={{ base: "100vw", md: "100%", lg: "100%" }}
          // overflowY={"scroll"}
          // sx={{ "::-webkit-scrollbar": { display: "none" } }}
        >
          <Box
            w={{ base: "100", md: "85%", lg: "80%" }}
            h={"80vh"}
            // border={"1px solid black"}
            boxShadow="dark-lg"
            overflowX={"hidden"}
            // overflowy={"visible"}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Table colorScheme="cyan" overflow={"scroll"}>
              <Thead
                bg={"#313131"}
                color={"white"}
                position={"sticky"}
                top={"0"}
              >
                <Tr>
                  <Th
                    color={"white"}
                    display={{ base: "none", md: "block", lg: "block" }}
                  >
                    Image
                  </Th>
                  <Th color={"white"}>Name</Th>
                  <Th color={"white"}>Category</Th>
                  <Th color={"white"}>Price</Th>
                  <Th color={"white"}>Stock</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length > 0 ? (
                  <>
                    {products.map((product) => {
                      return (
                        <Tr
                          key={product._id}
                          transition="background-color 300ms linear"
                          cursor={"pointer"}
                          _hover={{
                            bg: "#E8E2D9",
                          }}
                          onClick={() => {
                            setSellerSelectedProduct(product._id);

                            viewProduct();
                          }}
                        >
                          <Td
                            display={{ base: "none", md: "block", lg: "block" }}
                          >
                            {/* <img src={product.images} alt="" /> */}
                            <Image
                              src={product.images}
                              alt={product.name}
                              w={"100px"}
                              h={"100px"}
                              borderRadius={"4px"}
                              boxShadow="xl"
                              objectFit={"cover"}
                            />
                          </Td>
                          <Td>{product.name}</Td>
                          <Td>{product.category}</Td>
                          <Td>{product.price}</Td>
                          <Td>{product.stock}</Td>
                        </Tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {/* <Box
                    w={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text>No Products...!</Text>
                  </Box> */}
                  </>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AllProducts;
