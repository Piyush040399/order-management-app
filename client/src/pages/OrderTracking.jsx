import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { io } from "socket.io-client";

import Navbar from "../components/Navbar";

import { fetchOrder } from "../redux/slices/orderSlice";

const socket = io("http://localhost:5000");

const OrderTracking = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder(id));

    socket.emit("join-order", id);

    socket.on("status-update", () => {
      dispatch(fetchOrder(id));
    });

    return () => {
      socket.off("status-update");
    };
  }, [dispatch, id]);

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-8">Track Order</h1>

        <div className="mb-8 h-72">
          <img src="https://stackfood.app/wp-content/uploads/2024/01/stackfood-delivery-solution-map.webp" alt="map" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-4 text-xl">
          <p>
            Order ID :<strong> {id}</strong>
          </p>

          <p>
            Customer :<strong> {order?.customerName}</strong>
          </p>

          <p>
            Current Status :
            <span className="text-orange-500 font-bold"> {order?.status}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderTracking;
