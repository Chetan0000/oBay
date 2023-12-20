import { Box, Container, Link, Text } from "@chakra-ui/react";
import Login from "../../seller-Dash/Authentication/login";
import SignUp from "../../seller-Dash/Authentication/signUp";
import React, { useState } from "react";

const SellerPage = () => {
  const [flipper, setFlipper] = useState(true);
  return (
    <>
      <Container m={"auto"} centerContent>
        <Box
          width={"100vw"}
          height={"90vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderColor={"black"}
        >
          {flipper ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Login />
              <Text marginTop={"-110px"}>
                Don't have an Account?{" "}
                <Link
                  _hover={{ color: "#2563eb" }}
                  onClick={() => {
                    setFlipper(!flipper);
                  }}
                >
                  {" "}
                  Sign up
                </Link>
              </Text>
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SignUp />
              <Text marginTop={"20px"}>
                already have account?{" "}
                <Link
                  _hover={{ color: "#2563eb" }}
                  onClick={() => {
                    setFlipper(!flipper);
                  }}
                >
                  {" "}
                  Sign in
                </Link>
              </Text>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default SellerPage;
