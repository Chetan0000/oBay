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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import ProductForm from "../Seller_Components/ProductForm";
import { useState } from "react";
import { UserState } from "../../context/userContext";
import axios from "axios";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { seller } = UserState();

  // ----------------function to fetch all products---------------
  useEffect(() => {
    fetchAll();
  }, [seller]);

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

  return (
    <>
      <Box
        className="bar"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        h={"95%"}
        w={"100%"}
        // overflowY={"scroll"}
        // sx={{ "::-webkit-scrollbar": { display: "none" } }}
      >
        <Box
          w={"80%"}
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
          <Table>
            <Thead bg={"#313131"} color={"white"} position={"sticky"} top={"0"}>
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
                          console.log(product._id);
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
    </>
  );
};

export default AllProducts;
