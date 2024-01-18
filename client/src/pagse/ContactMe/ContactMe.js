import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { Avatar, Box, Image, Text, border } from "@chakra-ui/react";
const ContactMe = () => {
  return (
    <Box
      w={"100vw"}
      h={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"white"}
    >
      <Box
        shadow={"lg"}
        w={{ base: "95vw", md: "30vw", lg: "30vw" }}
        h={"200px"}
        border={"1px solid black"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box
          className="Image"
          w={{ base: "40vw", md: "25vw", lg: "20vw" }}
          borderRadius={"full"}
          border={"1px solid red"}
        >
          {" "}
          <Image
            borderRadius="500px"
            objectFit={"cover"}
            src="https://res.cloudinary.com/dlek1smmu/image/upload/v1705482098/young-say-hello-4788642-3988305-ezgif.com-gif-to-webp-converter_mmmw7w.webp"
          ></Image>
        </Box>

        <Box className="Text" color={"black"}>
          <Text mt={"-50px"} fontSize={"20px"} fontWeight={"semibold"}>
            Hello..
          </Text>
          <Text>
            I am <span className="font-semibold text-[20px]">Chetan</span>{" "}
          </Text>
          <Text>A Software Developer</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactMe;
