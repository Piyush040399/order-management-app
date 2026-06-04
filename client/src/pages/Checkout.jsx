import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import { placeOrder } from "../redux/slices/orderSlice";

import { clearCart } from "../redux/slices/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.address || !formData.phone) {
      return toast.error("Please fill all fields");
    }

    const payload = {
      ...formData,

      items: cartItems.map((item) => ({
        menuId: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await dispatch(placeOrder(payload)).unwrap();

      dispatch(clearCart());

      toast.success("Order Placed Successfully");

      navigate(`/success/${result._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-orange-500 text-white p-3 rounded-lg">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
