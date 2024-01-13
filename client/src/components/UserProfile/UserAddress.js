import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const UserAddress = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);
  //   "name": "Kumar",
  // "mobileNumber": "7894561235",
  // "pinCode": "123456",
  // "address": "asd fgh jkl",
  // "cityDistrictTown": "qqq",
  // "state": "asdre",
  // "alternatePhone": "7412589632",
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [pinCode, setPinCode] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [alternatePhone, setAlternatePhone] = useState();
  const [city, setCity] = useState();
  const [addressId, setAddressId] = useState();
  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    if (userData == 0) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await axios.get("/user/address", config);
      setAddressId(data[0]._id);
      setName(data[0].name);
      setPhone(data[0].mobileNumber);
      setPinCode(data[0].pinCode);
      setAddress(data[0].address);
      setAlternatePhone(data[0].alternatePhone);
      setState(data[0].state);
      setCity(data[0].cityDistrictTown);
      console.log("data", data[0].name);
    } catch (error) {}
    console.log("check function", name);
  };

  // function to update address

  const handelUpdate = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await axios.put(
        "/user/updateAddress",
        {
          iD: addressId,
          name,
          mobileNumber: phone,
          pinCode: pinCode,
          address,
          cityDistrictTown: city,
          state,
          alternatePhone,
        },
        config
      );
      toast.success("Address updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error in updating the address", {
        duration: 3000,
      });
    }
  };

  // ---- function to add Address ---------
  const handelAdd = async () => {
    if (userData == 0) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await axios.post(
        "/user/addAddress",
        {
          name,
          mobileNumber: phone,
          pinCode: pinCode,
          address,
          cityDistrictTown: city,
          state,
          alternatePhone,
        },
        config
      );
      toast.success("Address added successfully", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error in updating the address", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Box
        // w={"100vw"}
        className="Back_button"
        display={"flex"}
        alignItems={"center"}
        padding={{ base: "0px", md: "10px", lg: "10px" }}
        onClick={() => {
          navigate("/user/profile");
        }}
        position={"absolute"}
        // border={"1px solid black"}
        // bg={"white"}
      >
        <IoIosArrowRoundBack size={"2rem"} />
      </Box>

      <Box
        // border={"1px solid blue"}
        m={"auto"}
        mt={"50px"}
        w={{ base: "95vw", md: "60vw", lg: "65vw" }}
        // h={"70vh"}
        display={"flex"}
        // justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={"20px"}
        // paddingBottom={"30px"}
      >
        <Box w={"100%"}>
          <Text
            fontSize={"22px"}
            fontWeight={"bold"}
            fontFamily={"DM Sans"}
            as={"u"}
          >
            Your Address.
          </Text>
        </Box>

        <Box
          w={{ base: "100%", md: "30vw", lg: "30vw" }}
          //   border={"2px solid green"}
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>Phone No</FormLabel>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>PinCode</FormLabel>
            <Input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
            <FormLabel>Alternate Phone</FormLabel>
            <Input
              type="text"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              _focusVisible={{
                outline: "gray",
              }}
            ></Input>
          </FormControl>
        </Box>
        <Box
          w={"100%"}
          h={"50px"}
          //   border={"1px solid black"}
          display={"flex"}
          justifyContent={{ base: "center", md: "end", lg: "end" }}
          alignItems={"center"}
        >
          <Toaster position="top-center" reverseOrder={false} />
          {addressId ? (
            <>
              <Button
                bg={"#262626"}
                _hover={{ bg: "black" }}
                color={"white"}
                width={"200px"}
                onClick={handelUpdate}
                // marginTop={"25px"}
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <Button
                bg={"#262626"}
                _hover={{ bg: "black" }}
                color={"white"}
                width={"200px"}
                onClick={handelAdd}
                // marginTop={"25px"}
              >
                Add Address
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserAddress;
