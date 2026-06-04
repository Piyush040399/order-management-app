import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { addToCart } from "../redux/slices/cartSlice";

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(item));

    toast.success("Added to cart");
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{item.name}</h2>

        <p className="text-gray-500 mt-2">{item.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-500 text-xl font-bold">
            ₹{item.price}
          </span>

          <button
            onClick={handleAdd}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
