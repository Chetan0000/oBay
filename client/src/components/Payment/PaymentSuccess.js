import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../../actions/cartActions";

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];

  const referenceNum = seachQuery.get("reference");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartClear = () => {
    dispatch(clearCart(user));
  };
  useEffect(() => {
    cartClear();
  });

  return (
    <Box
      margin={"auto"}
      // border={"1px solid black"}
      w={"95vw"}
      h={"85vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        // border={"1px solid red"}
        h={{ base: "70vh", md: "40vh", lg: "50vh" }}
        w={{ base: "95vw", md: "50vw", lg: "500px" }}
        shadow={"lg"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display={"flex"} flexDirection={"row"} gap={"10px"}>
            <IoCheckmarkDoneCircleSharp size={"2rem"} color="#46A758" />
            <Text
              fontSize={"22px"}
              fontWeight={"semibold"}
              color={"#46A758"}
              textShadow={"#46A758 1px 0 10px;"}
            >
              Ordered Successfully
            </Text>
          </Box>
          <Box>
            <Text fontSize={"16px"}>TankYou For Shopping on OBay..</Text>
          </Box>
        </Box>
        <Box mt={"30px"}>
          <Text>Order Id: {referenceNum} </Text>
        </Box>

        <Box w={"100%"} h={"50px"} textAlign={"center"} mt={"30px"}>
          <Text
            cursor={"pointer"}
            onClick={() => {
              navigate("/");
            }}
            as={"u"}
            _hover={{
              fontSize: "17",
              fontWeight: "semibold",
              transitionDuration: "0.3s",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            Continue Shopping.
          </Text>
          {/* <Button>My Orders</Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
