import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ItemCard from "./ItemCard";
// ----------- redux toolkit -------------

import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const display = useDispatch();
  const deleteItem = () => {};
  const decreaseQuantity = () => {};
  const increaseQuantity = () => {};
  const CartItems = useSelector((state) => state.cart.products);
  return (
    <>
      <Box
        w={"90vw"}
        minH={"85vh"}
        border={"2px solid blue"}
        m={"auto"}
        marginTop={"20px"}
        overflow={"hidden"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box className="Header">
          <Text
            fontSize={"35px"}
            fontWeight={"semibold"}
            fontFamily={"DM Sans"}
          >
            Cart
          </Text>
        </Box>

        <Box
          className="Items-container"
          w={"100%"}
          border={"1px solid green"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box marginTop={"20px"}>
            <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
              <h2 className="col-span-2">Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Sub Total</h2>
            </div>
          </Box>
          <Box
            className="items"
            overflowX={"hidden"}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {CartItems.map((item) => {
              return (
                <>
                  <div key={item.product._id}>
                    <ItemCard item={item} />
                  </div>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
