import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toast } from "react-hot-toast";
import axios from "axios";
const SellerDashBoard = () => {
  const [products, setProducts] = useState([]);
  const seller = useSelector((state) => state.seller.seller);

  useEffect(() => {
    // window.location.reload();
    fetchProducts();
  }, []);

  // ----------------function to fetch all products---------------

  const fetchProducts = async () => {
    if (seller == 0) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${seller.token}`,
        },
      };

      const { data } = await axios.get(`/seller/products`, config);

      setProducts(data);
    } catch (error) {
      toast.error("Something went Wrong.. Please refresh the page  ", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Box
        className="sellerDashBoard"
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100vw"}
        h={"85vh"}
        marginTop={"20px"}
        marginX={"auto"}
        paddingX={"40px"}
        gap={"20px"}
      >
        {/* <Box border={"1px solid"} borderColor={"black"} h={"100%"} w={"0%"}>
          <Box>
            <SellerMenu />
          </Box>
        </Box> */}
        <AllProducts products={products}></AllProducts>
      </Box>
    </>
  );
};

export default SellerDashBoard;
