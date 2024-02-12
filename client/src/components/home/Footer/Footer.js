import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaLinkedin,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { initiateSearch } from "../../../actions/searchAction";
import { putSearchKeyWord } from "../../../redux/slices/searchSlice/searchSlice";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandel = (search) => {
    if (!search) {
      return;
    }

    // console.log("header check");
    dispatch(initiateSearch(search, 1));
    dispatch(putSearchKeyWord(search));
    // dispatch(handleNextPage);
    navigate(`/products/search/${search}`);
  };
  return (
    <Box
      w={"100vw"}
      minH={"350px"}
      display={"flex"}
      alignItems={"end"}
      pt={{ base: "50px", md: "5px", lg: "5px" }}
    >
      <Box
        w={"100vw"}
        minH={"250px"}
        bg={"#f5f5f3"}
        fontFamily={"DM Sans"}
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        justifyContent={{
          base: "center",
          md: "start",
          lg: "start",
        }}
        px={"10px"}
        py={"30px"}
        gap={{ base: "10px", md: "20px", lg: "30px" }}
      >
        <Box w={{ base: "95%", md: "33%", lg: "33%" }}>
          <Text
            fontSize={{ base: "16px", md: "18px", lg: "20px" }}
            fontWeight={"semibold"}
          >
            More about OBay
          </Text>

          <Text w={"70%"}>
            Obey is the E-commerce web Application built on MERN tech Stack
          </Text>
          <Image
            w={"100px"}
            src="https://res.cloudinary.com/dlek1smmu/image/upload/v1707740668/pngwing.com_eyblkv.png"
          ></Image>

          <Box
            fontSize={{ base: "20px", md: "25px", lg: "25px" }}
            justifyContent={"start"}
            display={"flex"}
            gap={"6px"}
            color={"#262626"}
          >
            <Link
              to={
                "https://www.instagram.com/i_thechetan?igsh=MXZ5am5udHQ4ZjBjNg=="
              }
              target="_blank"
              rel="instagram"
            >
              <Text
                cursor={"pointer"}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <FaSquareInstagram />
              </Text>
            </Link>
            <Link
              to={"https://github.com/Chetan0000"}
              target="_blank"
              rel="git"
            >
              <Text
                cursor={"pointer"}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <FaSquareGithub />
              </Text>
            </Link>

            <Link
              to={"https://www.linkedin.com/in/chetankkumar/"}
              target="_blank"
            >
              <Text
                cursor={"pointer"}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <FaLinkedin />
              </Text>
            </Link>

            <Link
              to={
                "Take a look at Chetan (@ITheChetan): https://x.com/ITheChetan?t=bbt3pLjLH2tQBWsa_8692A&s=08"
              }
              target="_blank"
            >
              <Text
                cursor={"pointer"}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <FaSquareXTwitter />
              </Text>
            </Link>
          </Box>
        </Box>
        {/* Menu Links */}

        <Box display={"flex"} w={{ base: "95%", md: "33%", lg: "33%" }}>
          <Box w={"50%"}>
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              fontWeight={"semibold"}
            >
              Shop
            </Text>

            <Box color={"#6d6d6d"}>
              <Text
                onClick={() => {
                  searchHandel("Appliance");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Appliance
              </Text>
              <Text
                onClick={() => {
                  searchHandel("Bags");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Bags
              </Text>
              <Text
                onClick={() => {
                  searchHandel("Beauty Products");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Beauty Products
              </Text>
              <Text
                onClick={() => {
                  searchHandel("Books");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Books
              </Text>
              <Text
                onClick={() => {
                  searchHandel("Clothing");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Clothing
              </Text>
              <Text
                onClick={() => {
                  searchHandel("Electronics");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Electronics
              </Text>
              <Text
                onClick={() => {
                  searchHandel("Home Furnishing");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Home Furnishing
              </Text>
            </Box>

            {/* Bags , Beauty Products , Books , Clothing ,Electronics, Home Furnishing*/}
          </Box>

          <Box w={"50%"}>
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              fontWeight={"semibold"}
            >
              Your Account
            </Text>

            <Box color={"#6d6d6d"}>
              <Text
                onClick={() => {
                  navigate("/user/profile");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Profile
              </Text>
              <Text
                onClick={() => {
                  navigate("/orders");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Orders
              </Text>

              <Text
                onClick={() => {
                  navigate("/user/profile/address");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Address
              </Text>

              <Text
                onClick={() => {
                  navigate("/user/profile/editUser");
                }}
                transitionDuration={"0.3s"}
                _hover={{
                  color: "black",
                  textDecoration: "underline",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Account Details
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
