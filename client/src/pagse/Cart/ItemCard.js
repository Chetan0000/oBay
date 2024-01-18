import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItem,
  increaseQuantity,
  deleteItem,
} from "../../actions/cartActions";
import { UserState } from "../../context/userContext";
const ItemCard = ({ product }) => {
  // const { user } = UserState();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const itemDelete = (obj) => {
    const product = obj;
    const quantity = obj.count;
    dispatch(deleteItem(product, user));
  };
  const decrease = (obj) => {
    const product = obj;
    const quantity = obj.count;
    if (quantity == 1) {
      return;
    }
    dispatch(decreaseItem(product, quantity - 1, user));
  };
  const increase = (obj) => {
    const product = obj;
    const quantity = obj.count;
    dispatch(increaseQuantity(product, quantity + 1, user));
  };

  return (
    <>
      <div className="w-full grid grid-cols-5 mb-4 border py-2">
        <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
          <ImCross
            onClick={() => itemDelete(product)}
            className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
          />
          <img
            className="w-32 h-32"
            src={product.item.images}
            alt="productImage"
          />
          <h1 className="font-titleFont font-semibold">{product.item.name}</h1>
        </div>
        <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
          <div className="flex w-1/3 items-center text-lg font-semibold">
            ₹ {product.item.price}
          </div>
          <div className="w-1/3 flex items-center gap-6 text-lg">
            <span
              onClick={() => decrease(product)}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              -
            </span>
            <p>{product.count}</p>
            <span
              onClick={() => {
                increase(product);
              }}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              +
            </span>
          </div>
          <div className="w-1/3 flex items-center  font-bold text-lg">
            <p>₹ {product.item.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
