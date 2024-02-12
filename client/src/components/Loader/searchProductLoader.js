import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const SearchProductLoader = () => {
  return (
    <Box w={"95vw"} display={"flex"} justifyContent={"center"} pt={"20px"}>
      <div className="grid sm:gap-2 md:gap-4 lg:gap-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
        <Stack>
          <Skeleton
            startColor="white"
            endColor="#EEEEEE"
            height="250px"
            w={"250px"}
          />
        </Stack>
        <Stack>
          <Skeleton
            startColor="white"
            endColor="#EEEEEE"
            height="250px"
            w={"250px"}
          />
        </Stack>
        <Stack>
          <Skeleton
            startColor="white"
            endColor="#EEEEEE"
            height="250px"
            w={"250px"}
          />
        </Stack>
      </div>
    </Box>
  );
};

export default SearchProductLoader;
