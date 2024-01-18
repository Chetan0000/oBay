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
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../actions/userActions";
const Login = () => {
  const [flipper, setFlipper] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useNavigate();
  const dispatch = useDispatch();
  // function to set show/hide password
  const handelClick = () => {
    setShow(!show);
  };

  // ============ submit/sign in button function =====================\\
  const cartItems = useSelector((state) => state.cart.products);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast("Please Fill all the fields", {
        duration: 3000,
      });
      return;
    }
    try {
      const config = {
        Headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/login",
        { email, password },
        config
      );
      // console.log("data");
      // localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(setUserData(data));

      console.log("check of cart data after loging in    ", cartItems);
      // console.log(localStorage.getItem("sellerInfo"));
      toast.success("Logged in Successfully ", {
        duration: 3000,
      });
      location("/");
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      toast.error(error.response.data, {
        duration: 3000,
      });
    }
  };

  return (
    <Box
      className="check"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      w={"100vw"}
      h={"90vh"}
    >
      <Box
        w={{ base: "75%", md: "45%", lg: "45%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div className="text-2xl font-semibold  p-3 -ml-40">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-1">
            Sign in
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
            // className="p-5 flex-col justify-center items-center gap-32"
          >
            <FormControl isRequired pb={"30px"} _hover>
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
              Sign in
            </Button>
            <Toaster position="top-center" reverseOrder={false} />
            <Button
              bg={"#484848"}
              _hover={{ bg: "#6F6D66" }}
              color={"white"}
              width={"100%"}
              onClick={() => {
                setEmail("test101@gmail.com");
                setPassword("123456");
              }}
            >
              Test Seller
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
