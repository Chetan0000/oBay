import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const EditUser = () => {
  const userData = useSelector((state) => state.user.user);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData == 0) {
      navigate("/user");
    }
    window.scrollTo(0, 0);
    setEmail(userData.email);
    setName(userData.name);
    setPhone(userData.phone);
  }, []);

  //-------------- Business logics -------------

  const submitHandler = () => {};

  return (
    <>
      <Box
        className="Back_button"
        display={"flex"}
        alignItems={"center"}
        padding={"15px"}
        onClick={() => {
          navigate("/user/profile");
        }}
      >
        <IoIosArrowRoundBack size={"2rem"} />
      </Box>
      <Box
        // border={"1px solid blue"}
        m={"auto"}
        mt={"30px"}
        w={{ base: "95vw", md: "60vw", lg: "65vw" }}
        h={"70vh"}
        display={"flex"}
        // justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={"20px"}
      >
        <Box>
          <Avatar size={{ base: "lg", md: "xl", lg: "2xl" }}></Avatar>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Name :</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>Email :</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>Phone No :</FormLabel>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
          </FormControl>
          <Button
            bg={"#262626"}
            _hover={{ bg: "black" }}
            color={"white"}
            width={"100%"}
            onClick={submitHandler}
            marginTop={"25px"}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditUser;
