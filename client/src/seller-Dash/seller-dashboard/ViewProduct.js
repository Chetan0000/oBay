import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserState } from "../../context/userContext";
import axios from "axios";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
const ViewProduct = () => {
  const { seller, setSellerSelectedProduct, sellerSelectedProduct } =
    UserState();

  const location = useNavigate();
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState();

  // -------------- function to fetch all details of product by Id ------------------------

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    if (!sellerSelectedProduct) {
      return;
    }
    console.log(sellerSelectedProduct);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${seller.token}`,
        },
      };
      // console.log(seller.token);
      const { data } = await axios.get(
        `/seller/product/${sellerSelectedProduct}`,

        config
      );
      console.log(data[0]);
      setName(data[0].name);
      setImages(data[0].images);
      setCategory(data[0].category);
      setDescription(data[0].description);
      setPrice(data[0].price);
      setStock(data[0].stock);
    } catch (error) {
      toast.error(error.response.data, {
        duration: 3000,
      });
    }
  };

  //   ------------------------- update functions---------------------------------------

  const postDetails = async (pics) => {
    setLoading(true);
    if (pics == undefined) {
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // console.log(pics);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzudljnu4");

      fetch("https://api.cloudinary.com/v1_1/dzudljnu4/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const img = data.url.toString();
          setImages(img);
          // console.log(images);
          setLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          setLoading(false);
        });
    }
  };

  // Function to add product
  const updateButton = async () => {
    setLoading(true);
    if (!name || !price || !category || !description || !images) {
      toast("Please Fill all the fields", {
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${seller.token}`,
        },
      };
      // console.log(seller.token);
      const { data } = await axios.put(
        "/seller/productupdate",
        {
          productId: sellerSelectedProduct,
          name: name,
          description: description,
          price: price,
          images: images,
          category: category,
          stock: stock,
        },
        config
      );
      setLoading(false);
      toast.success("Item Updated successfully", {
        duration: 3000,
      });
      // alert("Item added successfully");
      // setImages("");
      // setName("");
      // setCategory("");
      // setDescription("");
      // setPrice("");
      // setStock("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, {
        duration: 3000,
      });
      return;
    }
  };

  // ---------------- function to delete the product -----------------

  const deleteButton = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${seller.token}`,
        },
      };

      const { data } = await axios.get(
        `/seller/deleteProduct/${sellerSelectedProduct}`,
        config
      );
      setLoading(false);
      toast.success("Item deleted..!", {
        duration: 3000,
      });
      setSellerSelectedProduct("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, {
        duration: 3000,
      });
    }
  };
  return (
    <Box
      width={"100vw"}
      minH={"85vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      // paddingTop={{ base: "20px" }}
      // border={"1px solid red"}
    >
      <Box
        width={"80%"}
        display={"flex"}
        justifyContent={"flex-start"}
        // paddingY={"4px"}
        // paddingX={"10px"}
        // marginTop={"-100px"}
        // marginBottom={"100px"}
      >
        <Box
          cursor={"pointer"}
          onClick={() => {
            setSellerSelectedProduct("");
          }}
        >
          <IoMdArrowBack />
        </Box>
      </Box>
      <div className="shadow-2xl sm:w-4/5 md:w-[658px] lg:w-[756px] sm:min-h-4/5 md:h-3/4 lg:h-3/4 flex-col justify-center">
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          justifyContent={""}
          // alignItems={"center"}
          // w={{ base: "80%", md: "75%", lg: "75%" }}
          // h={{ base: "80%", md: "75%", lg: "75%" }}
          w={"100%"}
          h={"90%"}
          gap={"20px"}
          // border={"1px solid black"}
        >
          <Box
            className="image-input"
            w={{ lg: "50%", md: "50%", base: "100%" }}
            padding={"5px"}
          >
            <FormControl>
              <FormLabel htmlFor="select-image">Image</FormLabel>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                h={"100%"}
              >
                {images ? (
                  <Box
                    mt={2}
                    textAlign="center"
                    w={{ base: "150px", md: "300px", lg: "300px" }}
                    h={{ base: "150px", md: "300px", lg: "300px" }}
                    // border={"1px solid black"}
                    onClick={() => {
                      setImages("");
                    }}
                  >
                    <Image
                      className="shadow-2xl"
                      rounded="md"
                      src={images}
                      alt={""}
                      w={{ base: "150px", md: "300px", lg: "300px" }}
                      h={{ base: "150px", md: "300px", lg: "300px" }}
                      objectFit={"cover"}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Input
                      // width={"200px"}
                      border={"dashed 1px black"}
                      w={{ base: "150px", md: "300px", lg: "300px" }}
                      h={{ base: "150px", md: "300px", lg: "300px" }}
                      id="select-image"
                      type="file"
                      p={1.5}
                      accept="image/*"
                      bg={"#EEEEEC"}
                      onChange={(e) => {
                        // setImages([]);
                        postDetails(e.target.files[0]);
                      }}
                    ></Input>
                  </Box>
                )}
              </Box>
            </FormControl>
          </Box>
          <Box w={{ lg: "50%", md: "50%", base: "100%" }} padding={"5px"}>
            <FormControl>
              <FormLabel>Name Of Product</FormLabel>
              <Input
                value={name}
                placeholder="item"
                type="text"
                bg={"#EEEEEC"}
                _focusVisible={{
                  outline: "gray",
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Input>

              <FormLabel>Price</FormLabel>
              <Input
                value={price}
                placeholder="item"
                type="number"
                bg={"#EEEEEC"}
                _focusVisible={{
                  outline: "gray",
                }}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></Input>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Category"
                bg={"#EEEEEC"}
                onChange={(e) => {
                  setCategory(e.target.value);
                  // console.log(category);
                  // console.log(e.target.value);
                }}
              >
                <option value="Appliances">Appliances</option>
                <option value="Beauty products">Beauty products</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Electronics">Electronics</option>
                <option value="Home furnishings">Home furnishings</option>
              </Select>

              <FormLabel>Stock</FormLabel>
              <Input
                value={stock}
                placeholder="ex: 10"
                type="number"
                bg={"#EEEEEC"}
                _focusVisible={{
                  outline: "gray",
                }}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              ></Input>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                placeholder="Description"
                bg={"#EEEEEC"}
                _focusVisible={{
                  outline: "gray",
                }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Textarea>
            </FormControl>
          </Box>
        </Box>
        <Box
          width={"100%"}
          // border={"solid 1px black"}
          display={"flex"}
          flexDirection={{ base: "row", md: "row", lg: "row" }}
          justifyContent={{ base: "center", md: "end", lg: "end" }}
          alignItems={"center"}
          gap={"20px"}
          padding={"10px"}
        >
          <Button
            padding={"10px"}
            bg={"#262626"}
            _hover={{ bg: "black" }}
            color={"white"}
            width={{ base: "100px", md: "170px", lg: "170px" }}
            onClick={deleteButton}
          >
            Delete
            {/* <UseAnimations animation={trash2} size={56}  /> */}
          </Button>
          <Button
            padding={"10px"}
            bg={"#262626"}
            _hover={{ bg: "black" }}
            color={"white"}
            width={{ base: "100px", md: "170px", lg: "170px" }}
            onClick={updateButton}
          >
            update
          </Button>
          <Toaster position="top-center" reverseOrder={false} />
        </Box>
      </div>
    </Box>
  );
};

export default ViewProduct;
