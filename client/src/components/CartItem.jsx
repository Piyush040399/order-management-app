import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h2 className="font-bold text-xl">{item.name}</h2>

        <p className="text-gray-500">₹{item.price}</p>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => dispatch(decreaseQuantity(item._id))}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => dispatch(increaseQuantity(item._id))}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => dispatch(removeFromCart(item._id))}
        className="text-red-500 font-bold"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
