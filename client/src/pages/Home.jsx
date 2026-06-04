import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";

import { fetchMenu } from "../redux/slices/menuSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { menu, loading } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-8">
        <h1 className="text-4xl font-bold mb-8">Popular Dishes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menu.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;