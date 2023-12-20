import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const location = useNavigate();
  //
  const handelClick = () => {
    setShow(!show);
  };

  //
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !phone) {
      toast("Please Fill all the fields", {
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        Headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/seller/signup",
        {
          name,
          email,
          phone,
          password,
        },
        config
      );
      setLoading(false);
      localStorage.setItem("sellerInfo", JSON.stringify(data));
      toast.success("Registration Successful", {
        duration: 3000,
      });
      location("/seller/dash");
      return;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, {
        duration: 3000,
      });
      return;
    }
  };

  return (
    <>
      <Box
        className="SignUp-main-box"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100vw"}
        h={"90hv"}
      >
        <Box
          w={{ base: "75%", md: "45%", lg: "45%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div className="text-2xl font-semibold p-3 -ml-40">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-1">
              Sign Up
            </h1>
          </div>
          <Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"20px"}
              padding={"5px"}
            >
              <FormControl isRequired pb={"30px"} _hover>
                <FormLabel color={"#4b5563"}>Name</FormLabel>
                <Input
                  value={name}
                  placeholder="seller name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  _focusVisible={{
                    outline: "gray",
                  }}
                />
                <FormLabel color={"#4b5563"}>Email</FormLabel>
                <Input
                  value={email}
                  placeholder="join@gmail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  _focusVisible={{
                    outline: "gray",
                  }}
                />

                <FormLabel color={"#4b5563"}>phone No</FormLabel>
                <Input
                  value={phone}
                  placeholder="seller name"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  _focusVisible={{
                    outline: "gray",
                  }}
                />
                <FormLabel color={"#4b5563"}>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    _focusVisible={{
                      outline: "gray",
                    }}
                  />
                  <InputRightElement>
                    <Button
                      marginRight={"2px"}
                      colorScheme="#050504"
                      color={"black"}
                      fontSize={"14px"}
                      h={"1.75rem"}
                      size={"sm"}
                      onClick={handelClick}
                    >
                      {show ? <BiShow /> : <BiHide />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                bg={"#262626"}
                _hover={{ bg: "black" }}
                color={"white"}
                width={"100%"}
                onClick={submitHandler}
              >
                Sign up
              </Button>
              <Toaster position="top-center" reverseOrder={false} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
