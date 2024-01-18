import React from "react";
import { Avatar, Box, Button, Image, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserData } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //-------- Log Out function --------------
  const handelClick = () => {
    if (user) {
      dispatch(deleteUserData(user));
      navigate("/");
    }

    // ---------- user edit function --------------
  };
  return (
    <>
      <Box
        className="Container"
        w={{ base: "95vw", md: "95vw", lg: "85vw" }}
        h={"85vh"}
        // border={"2px solid red"}
        m={"auto"}
        marginTop={"20px"}
      >
        <Box display={"flex"} gap={"15px"}>
          <Avatar></Avatar>
          <Box display={"flex"} flexDirection={"column"}>
            <Text fontSize={"22px"} fontWeight={"bold"} fontFamily={"DM Sans"}>
              {user.name}
            </Text>
            <Text fontSize={"15px"} as={"u"} marginTop={"-5px"}>
              {user.email}
            </Text>
          </Box>
        </Box>

        <Box
          w={"90%"}
          // h={"90%"}
          // border={"1px solid red"}
          m={"auto"}
          mt={"15px"}
          display={"flex"}
          flexDirection={"column"}
          gap={{ base: "0px", md: "30px", lg: "30px" }}
        >
          <Box
            display={"flex"}
            flexDirection={{ base: "column", md: "row", lg: "row" }}
            justifyContent={{
              base: "center",
              md: "space-between",
              lg: "space-between",
            }}
            alignItems={"center"}
            gap={{ base: "15px", md: "0px", lg: "0px" }}
          >
            {/* -------------- user edit ------------- */}
            <Box
              w={{ base: "80%", md: "30%", lg: "30%" }}
              h={"100px"}
              border={"1px solid #d6d6d6"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              cursor={"pointer"}
              _hover={{
                bg: "#eeeeee",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              onClick={() => {
                navigate("/user/profile/editUser");
              }}
            >
              <Box h={"75%"} w={"96px"} objectFit={"cover"}>
                <Image src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"></Image>
              </Box>
              <Box>
                <Text fontSize={"17px"}> Login & security</Text>
                <Text fontSize={"14px"}>
                  Edit login, name, and mobile number
                </Text>
              </Box>
            </Box>

            {/* -----------  your orders -------------- */}
            <Box
              w={{ base: "80%", md: "30%", lg: "30%" }}
              h={"100px"}
              border={"1px solid #d6d6d6"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              cursor={"pointer"}
              _hover={{
                bg: "#eeeeee",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              <Box h={"80%"} w={"96px"} objectFit={"cover"}>
                <Image
                  src="https://res.cloudinary.com/dlek1smmu/image/upload/v1704905669/bd6cc8c0df3d008c821fe141ef47c2e8_sozot4.png"
                  h={"80%"}
                  w={"90%"}
                  m={"auto"}
                ></Image>
              </Box>
              <Box>
                <Text fontSize={"17px"}> Your Orders</Text>
                <Text fontSize={"14px"}>
                  Track, return, or buy things again
                </Text>
              </Box>
            </Box>
            {/* ----------------------- Your Addresses ------------ */}
            <Box
              w={{ base: "80%", md: "30%", lg: "30%" }}
              h={"100px"}
              border={"1px solid #d6d6d6"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              cursor={"pointer"}
              _hover={{
                bg: "#eeeeee",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              onClick={() => {
                navigate("/user/profile/address");
              }}
            >
              <Box h={"80%"} w={"85px"} objectFit={"cover"}>
                <Image src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"></Image>
              </Box>
              <Box>
                <Text fontSize={"17px"}> Your Addresses</Text>
                <Text fontSize={"14px"}>
                  Edit addresses for orders and gifts
                </Text>
              </Box>
            </Box>
            <Box></Box>
          </Box>

          {/* ------------------ next ------------------ */}
          <Box
            display={"flex"}
            // border={"1px solid black"}
            flexDirection={{ base: "column", md: "row", lg: "row" }}
            justifyContent={{
              base: "center",
              md: "space-between",
              lg: "space-between",
            }}
            alignItems={"center"}
            gap={{ base: "15px", md: "0px", lg: "0px" }}
          >
            {/* -----------  Cart -------------- */}
            <Box
              w={{ base: "80%", md: "30%", lg: "30%" }}
              h={"100px"}
              border={"1px solid #d6d6d6"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              cursor={"pointer"}
              _hover={{
                bg: "#eeeeee",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Box h={"75%"} w={"92px"} objectFit={"cover"}>
                <Image src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"></Image>
              </Box>
              <Box>
                <Text fontSize={"17px"}> Cart</Text>
                <Text fontSize={"14px"}>
                  Edit cart item, quantity, and delete
                </Text>
              </Box>
            </Box>

            {/* ----------------------- Contact Us ------------ */}
            <Box
              w={{ base: "80%", md: "30%", lg: "30%" }}
              h={"100px"}
              border={"1px solid #d6d6d6"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              cursor={"pointer"}
              _hover={{
                bg: "#eeeeee",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              onClick={() => {
                navigate("/contactMe");
              }}
            >
              <Box
                h={"80%"}
                w={"85px"}
                objectFit={"cover"}
                pl={"10px"}
                pr={"10px"}
              >
                <Image src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png"></Image>
              </Box>
              <Box mt={"-40px"}>
                <Text fontSize={"17px"}> Contact us</Text>
                {/* <Text fontSize={"14px"}></Text> */}
              </Box>
            </Box>
            {/* -----------  WIshList -------------- */}
            <Box
              w={{ base: "80%", md: "30%", lg: "30%" }}
              h={"100px"}
              border={"1px solid white"}
              borderRadius={"10px"}
              display={{ base: "none", md: "flex", lg: "flex" }}
              justifyContent={"center"}
              alignItems={"center"}
              // cursor={"pointer"}
              _hover={{
                bg: "#eeeeee",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              // onClick={() => {
              //   navigate("/wishList");
              // }}
            >
              {/* <Box h={"80%"} w={"100px"} objectFit={"cover"}>
                <Image
                  src="https://res.cloudinary.com/dlek1smmu/image/upload/v1704905669/bd6cc8c0df3d008c821fe141ef47c2e8_sozot4.png"
                  h={"80%"}
                  w={"90%"}
                  m={"auto"}
                ></Image>
              </Box>
              <Box>
                <Text fontSize={"17px"}> Wish List</Text>
                <Text fontSize={"14px"}>
                  {" "}
                  Edit wishList, Buy, and delete item
                </Text>
              </Box> */}
            </Box>
            <Box></Box>
          </Box>
        </Box>

        {/* ------------ log out element --------------- */}
        <Box
          // border={"1px solid yellow"}
          display={"flex"}
          justifyContent={{ base: "center", md: "end", lg: "end" }}
          marginTop={"10px"}
          pt={"10px"}
          pb={"10px"}
        >
          <Button
            color={"white"}
            bg={"#ef4444"}
            _hover={{
              bg: "#b91c1c",
            }}
            onClick={handelClick}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
