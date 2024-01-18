import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
// ----------- redux toolkit -------------

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import { setTotalPrice } from "../../redux/slices/cart/cartSlice";
import { motion } from "framer-motion";
const Cart = () => {
  const display = useDispatch();
  const [total, setTotal] = useState(0);
  const [offer, setOffer] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [subTotal, setSUbTotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  const CartItems = useSelector((state) => state.cart.products);
  console.log("From Cart.js   ", CartItems);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // -------- logics ------------

  const handelClick = async () => {
    dispatch(clearCart(user));
  };
  useEffect(() => {
    if (CartItems.length > 0) {
      calculate();
    }
  }, [CartItems]);

  const calculate = () => {
    let sum = 0;
    for (let i = 0; i < CartItems.length; i++) {
      let price = CartItems[i].item.price * CartItems[i].count;
      sum += price;
    }
    setSUbTotal(sum);
    setShippingCharge(100);
    let t = sum + 100;
    // console.log("TOtal", t);

    setTotal(t);

    // console.log("TOtal ----", total);
    dispatch(setTotalPrice(total));
    console.log(sum);
  };

  const handelOffer = () => {
    // setOffer(price);
    setTotal(offerPrice + shippingCharge);
    // console.log(offerPrice);
  };

  return (
    <Box
      w={"90vw"}
      minH={"85vh"}
      // border={"2px solid blue"}
      m={"auto"}
      marginTop={"20px"}
      marginBottom={"50px"}
      overflow={"hidden"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box className="Header">
        <Text fontSize={"35px"} fontWeight={"semibold"} fontFamily={"DM Sans"}>
          Cart
        </Text>
      </Box>
      {CartItems.length > 0 ? (
        <>
          <Box>
            <Box
              className="Items-container"
              w={"100%"}
              // border={"1px solid green"}
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
                      <div key={item._id}>
                        <ItemCard product={item} />
                      </div>
                    </>
                  );
                })}
              </Box>
            </Box>

            {/*--------------------------- Cart Reset ----------------------  */}
            <Box
              w={"100%"}
              // border={"1px solid black"}
            >
              <Button
                w={"150px"}
                borderRadius={"0px"}
                color={"white"}
                bg={"#ef4444"}
                _hover={{
                  bg: "#b91c1c",
                }}
                onClick={handelClick}
              >
                Reset Cart
              </Button>
            </Box>

            {/* ------------- Coupon functionality / component ---------------- */}

            <Box
              w={"100%"}
              h={"50px"}
              className="border"
              mt={"20px"}
              mb={"5px"}
              display={"flex"}
              justifyContent={{
                base: "space-between",
                md: "start",
                lg: "start",
              }}
              gap={{ base: "0px", md: "10px", lg: "10px" }}
              alignItems={"center"}
              pl={{ base: "0px", md: "10px", lg: "15px" }}
            >
              <Input
                _focusVisible={{
                  outline: "gray",
                }}
                placeholder="Coupon Code"
                w={{ base: "50%", md: "200px", lg: "200px" }}
                borderRadius={"0px"}
                onChange={(e) => {
                  setOffer(e.target.value);
                  setOfferPrice(subTotal - e.target.value);
                }}
              ></Input>

              <Button
                borderRadius={"0px"}
                bg={"#484848"}
                _hover={{ bg: "#6F6D66" }}
                color={"white"}
                onClick={() => {
                  setTotal(offerPrice + shippingCharge);
                  handelOffer();
                }}
              >
                Apply Coupon
              </Button>
            </Box>

            <div className="max-w-7xl gap-4 flex justify-end mt-4">
              <div className="w-96 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-right">
                  Cart totals
                </h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide font-titleFont">
                      ₹ {subTotal}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Offer
                    <span className="font-bold tracking-wide text-lg font-titleFont">
                      {offer != 0 ? <>{offerPrice}</> : <></>}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide font-titleFont">
                      ₹ {shippingCharge}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-lg font-titleFont">
                      ₹ {total}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link to="/paymentgateway">
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Box>
        </>
      ) : (
        <>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <Box
              w={"100%"}
              // border={"1px solid black"}
              mt={"30px"}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={{ base: "column", md: "row", lg: "row" }}
              gap={"10px"}
            >
              <Image src="https://res.cloudinary.com/dlek1smmu/image/upload/v1705406702/emptyCart.230e4848b62fb3cab325_spjnx8.png"></Image>
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Your Cart feels lonely.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Your Shopping cart lives to serve. Give it purpose - fill it
                  with books, electronics, videos, etc. and make it happy.
                </p>
                <Link to="/">
                  <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </Box>
          </motion.div>
        </>
      )}
    </Box>
  );
};

export default Cart;
