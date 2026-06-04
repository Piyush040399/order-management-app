import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-4xl font-bold text-green-600">
          Order Placed Successfully 🎉
        </h1>

        <p className="mt-5">Order ID</p>

        <p className="font-bold">{id}</p>

        <Link
          to={`/track/${id}`}
          className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          Track Order
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;
