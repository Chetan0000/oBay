import axios from "axios";

import { addSearchResults } from "../redux/slices/searchSlice/searchSlice";

let currentPage = 1;
let totalPage = 0;
let word = "";
const initiateSearch = (query, page) => async (dispatch, getState) => {
  word = query;
  if (!query) {
    console.log(currentPage, " --------- ");
    return;
  }
  console.log(currentPage, " --------- ");
  try {
    const { data } = await axios.get(
      `/product/search?searchKeyWord=${query}&page=${page}&pageSize=6`
    );
    const { products, totalPages } = data;
    totalPage = totalPages;

    console.log("search Data", products);
    console.log(totalPage);
    dispatch(addSearchResults(products));
  } catch (error) {
    console.log(error);
    return;
  }
};

const handlePrevPage = () => async (dispatch, getState) => {
  if (currentPage > 1) {
    currentPage--;
    initiateSearch(word, currentPage);
    console.log(currentPage, " -+++-- ");
  }
  console.log(currentPage, " -+++-- ");
};

const handleNextPage = () => async (dispatch, getState) => {
  if (currentPage < totalPage) {
    currentPage++;
    initiateSearch(word, currentPage);
    console.log(currentPage, "++++++");
  }
  console.log(currentPage, "++++++");
};

export { handleNextPage, handlePrevPage, initiateSearch };
