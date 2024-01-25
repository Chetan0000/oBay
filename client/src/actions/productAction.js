import axios from "axios";
import { addSelectedProduct } from "../redux/slices/Product/ProductSlice";
import toast from "react-hot-toast";

export const addReview =
  (user, _id, avgRating, ratingGiven, reviewGiven) =>
  async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/user/addreview",
        {
          productId: _id,
          avgRating: avgRating,
          rating: ratingGiven,
          comment: reviewGiven,
        },
        config
      );
      console.log(data);
      dispatch(
        addSelectedProduct({
          _id: data._id,
          image: data.images,
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
          stock: data.stock,
          rating: data.ratings,
          reviews: data.reviews,
        })
      );
      //   console.log(product);
    } catch (error) {
      toast.error("Ops.. Error", {
        duration: 3000,
      });
    }
  };
