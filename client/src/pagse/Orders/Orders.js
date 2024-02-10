import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [date, setdate] = useState("");

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (user == 0) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/user/orders", config);
      setOrders(data);
      setdate(data.createdAt);
      // setdate(date.substring(0, 10));
      console.log("Orders data form Orders  ", data);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const navigate = useNavigate();
  return (
    <>
      {/* back Logo functionality */}
      <Box
        // border={"1px solid black"}
        w={"100vw"}
        className="Back_button"
        display={"flex"}
        alignItems={"center"}
        padding={{ base: "0px", md: "10px", lg: "10px" }}
        onClick={() => {
          navigate(-1);
        }}
        cursor={"pointer"}
        position={"fixed"}
        // border={"1px solid black"}
        // bg={"white"}
      >
        <IoIosArrowRoundBack size={"2rem"} />
      </Box>
      <Box
        w={"100vw"}
        // h={"85vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // border={"1px solid black"}
        overflowY={"auto"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          w={{ base: "95%", md: "75%", lg: "70%" }}
          // h={"100vh"}
          // border={"2px solid red"}
          paddingBottom={"40px"}
          mt={"30px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Box w={"100%"}>
            <Text
              fontSize={"22px"}
              fontWeight={"bold"}
              fontFamily={"DM Sans"}
              as={"u"}
            >
              Orders.
            </Text>
          </Box>
          {orders &&
            orders.map((order) => {
              return (
                <>
                  {/* --------------- orders main ------------------- */}
                  <Box
                    key={order._id}
                    w={"100%"}
                    border={"2px solid #f6f6f6"}
                    shadow={"lg"}
                    borderRadius={"10px"}
                    mt={"20px"}
                    pl={"3px"}
                    pr={"3px"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"4px"}
                    transition="background-color 300ms linear"
                    _hover={{
                      bg: "#f6f6f6",
                      transitionDuration: "0.2s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box
                        display={"flex"}
                        width={{ base: "220px", md: "400px", lg: "400px" }}
                        // border={"1px solid black"}
                        justifyContent={{
                          base: "start",
                          md: "space-between",
                          lg: "space-between",
                        }}
                        flexDirection={{ base: "column", md: "row", lg: "row" }}
                        alignItems={{
                          base: "start",
                          md: "center",
                          lg: "center",
                        }}
                      >
                        <Text>OrderId: {order.orderID}</Text>
                        <Text>{order.createdAt.substring(0, 10)}</Text>
                      </Box>

                      <Box>
                        <Text fontWeight={"semibold"}>
                          {order.orderStatus.type}
                        </Text>
                      </Box>
                    </Box>
                    {/* image price name  ------------ sub main -----------*/}
                    {order.items.map((item) => {
                      return (
                        <Box
                          display={"flex"}
                          flexDirection={{
                            base: "column",
                            md: "row",
                            lg: "row",
                          }}
                          gap={"10px"}
                          border={"2px solid #f6f6f6"}
                          shadow={"sm"}
                        >
                          <Box
                            border={"2px solid #f6f6f6"}
                            w={{ base: "100%", md: "60%", lg: "60%" }}
                            // border={"1px solid pink"}
                            className="ImageNamePrice"
                            pl={"3px"}
                            pr={"3px"}
                            display={"flex"}
                            // justifyContent={{
                            //   base: "space-between",
                            //   md: "space-evenly",
                            //   lg: "space-evenly",
                            // }}
                            justifyContent={"space-between"}
                          >
                            <Box w={"100px"}>
                              <Image
                                w={"100px"}
                                h={"100px"}
                                src={item.productId.images}
                                borderRadius={"4px"}
                                boxShadow="xl"
                                objectFit={"cover"}
                              ></Image>
                            </Box>
                            <Box>
                              <Text fontWeight={"medium"}>
                                {item.productId.name}
                              </Text>
                              <Text>Quantity: {item.purchasedQty}</Text>
                            </Box>
                            <Box>
                              <Text>{item.payablePrice}</Text>
                              <Text fontWeight={"medium"}>
                                {item.payablePrice * item.purchasedQty}
                              </Text>
                              <Text fontWeight={"semibold"}>{item.status}</Text>
                            </Box>
                          </Box>
                          <Box>
                            <Text fontWeight={"medium"}>Address: </Text>
                            <div className="pl-[6px]">
                              <Box display={"flex"}>
                                <Text>{order.addressId.name} ,</Text>{" "}
                                <Text>{order.addressId.mobileNumber}</Text>
                              </Box>
                              <Text>{order.addressId.address}</Text>
                              <Box display={"flex"}>
                                <Text>
                                  {order.addressId.cityDistrictTown} ,
                                </Text>
                                <Text>{order.addressId.pinCode}</Text>
                              </Box>
                            </div>
                          </Box>
                        </Box>
                      );
                    })}
                    <Box display={"flex"} justifyContent={"end"}>
                      <Text fontWeight={"bold"}>
                        Total: {order.totalAmount}
                      </Text>
                    </Box>
                  </Box>
                </>
              );
            })}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
